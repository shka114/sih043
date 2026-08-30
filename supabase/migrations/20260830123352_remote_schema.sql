SET local check_function_bodies = off;

CREATE TABLE "public"."Ai_analysis" (
  "ID"                    uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "Problem_ID"            uuid                     NOT NULL,
  "Ai_generated_category" text,
  "Ai_summary"            text,
  "Ai_priority"           text,
  "Ai_suggestions"        boolean                  DEFAULT false,
  "Craeted_at"            timestamp with time zone DEFAULT now(),
  CONSTRAINT "Ai_analysis_pkey" PRIMARY KEY ("ID")
);

ALTER TABLE "public"."Ai_analysis"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."Industry_Partners" (
  "partner_id"    uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "company_name"  text                     NOT NULL,
  "partner_type"  text                     DEFAULT '''Industry'''::text,
  "expertise"     text,
  "description"   text,
  "contact_email" text,
  "phone"         text,
  "created_at"    timestamp with time zone DEFAULT now(),
  CONSTRAINT "Industry_Partners_pkey" PRIMARY KEY (partner_id)
);

ALTER TABLE "public"."Industry_Partners"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."Institutions" (
  "Institution_ID" uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "Name"           text                     NOT NULL,
  "Type"           text                     DEFAULT '''University'::text,
  "Location"       text,
  "Expertise"      text,
  "Description"    text,
  "Contact_email"  text,
  "Created_at"     timestamp with time zone DEFAULT now(),
  CONSTRAINT "Institutions_pkey" PRIMARY KEY ("Institution_ID")
);

ALTER TABLE "public"."Institutions"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."Problems" (
  "Problem ID"  uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "Title"       text                     NOT NULL,
  "Description" text,
  "Category"    text                     DEFAULT '''Other'''::text,
  "Location"    text,
  "Priority"    text                     DEFAULT '''Medium'''::text,
  "Status"      text                     DEFAULT '''Pending'''::text,
  "User ID"     uuid                     NOT NULL,
  "Date"        timestamp with time zone DEFAULT now(),
  CONSTRAINT "Problems_pkey" PRIMARY KEY ("Problem ID")
);

ALTER TABLE "public"."Problems"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."Projects" (
  "project_id"     uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "problem_id"     uuid                     NOT NULL,
  "institution_id" uuid,
  "project_name"   text,
  "description"    text,
  "status"         text                     DEFAULT '''Proposed'''::text,
  "start_date"     date,
  "end_date"       date,
  "created_at"     timestamp with time zone DEFAULT now(),
  CONSTRAINT "Projects_pkey" PRIMARY KEY (project_id)
);

ALTER TABLE "public"."Projects"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."Solutions" (
  "solution_id"           uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "problem_id"            uuid                     NOT NULL,
  "project_id"            uuid,
  "submitted_by"          uuid,
  "solution_description"  text,
  "status"                text                     DEFAULT '''Proposed'''::text,
  "implementation_status" text                     DEFAULT '''Not Started'''::text,
  "impact_description"    text,
  "created_at"            timestamp with time zone DEFAULT now(),
  CONSTRAINT "Solutions_pkey" PRIMARY KEY (solution_id)
);

ALTER TABLE "public"."Solutions"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."Teams" (
  "team_id"     uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "project_id"  uuid                     NOT NULL,
  "member_id"   uuid,
  "member_name" text,
  "member_role" text                     DEFAULT '''Student'''::text,
  "created_at"  timestamp with time zone DEFAULT now(),
  CONSTRAINT "Teams_pkey" PRIMARY KEY (team_id)
);

ALTER TABLE "public"."Teams"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."Users" (
  "ID"    uuid NOT NULL DEFAULT gen_random_uuid(),
  "Name"  text NOT NULL,
  "Email" text,
  "Role"  text DEFAULT '''Cititzen'''::text,
  CONSTRAINT "Users_pkey" PRIMARY KEY ("ID")
);

ALTER TABLE "public"."Users"
  ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.rls_auto_enable()
  RETURNS event_trigger
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'pg_catalog'
  AS $function$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN
    SELECT *
    FROM pg_event_trigger_ddl_commands()
    WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      AND object_type IN ('table','partitioned table')
  LOOP
     IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
      BEGIN
        EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
        RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
      EXCEPTION
        WHEN OTHERS THEN
          RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
      END;
     ELSE
        RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
     END IF;
  END LOOP;
END;
$function$;

CREATE EVENT TRIGGER "ensure_rls"
  ON ddl_command_end
  WHEN TAG IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
  EXECUTE FUNCTION "public"."rls_auto_enable"();

GRANT EXECUTE ON FUNCTION "public"."rls_auto_enable"() TO PUBLIC, "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."Ai_analysis" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."Industry_Partners" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."Institutions" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."Problems" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."Projects" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."Solutions" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."Teams" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."Users" TO "anon", "authenticated", "postgres", "service_role";

