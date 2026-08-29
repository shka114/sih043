
import { useState } from "react";

function App() {
  const [portal, setPortal] = useState(null);
  const [page, setPage] = useState("home");

  // LOGIN PAGE
  if (portal) {
    return (
      <div className="login-screen">
        <div className="login-box">

          <h1>{portal} Login</h1>

          <p>
            Login to your {portal.toLowerCase()} account
          </p>

          <input
            type="email"
            placeholder="Enter your email"
          />

          <input
            type="password"
            placeholder="Enter your password"
          />

          <button>Login</button>

          <button
            className="back-button"
            onClick={() => setPortal(null)}
          >
            ← Back
          </button>

        </div>
      </div>
    );
  }

  // POST A PROBLEM PAGE
  if (page === "post-problem") {
    return (
      <div className="login-screen">

        <div className="login-box">

          <h1>Post a Problem</h1>

          <p>
            Share a real-world problem that needs a solution.
          </p>

          <input
            type="text"
            placeholder="Problem Title"
          />

          <input
            type="text"
            placeholder="Describe the Problem"
          />

          <input
            type="text"
            placeholder="Category"
          />

          <input
            type="text"
            placeholder="Location"
          />

          <button>
            Submit Problem
          </button>

          <button
            className="back-button"
            onClick={() => setPage("home")}
          >
            ← Back
          </button>

        </div>

      </div>
    );
  }

  // EXPLORE PROBLEMS PAGE
  if (page === "explore") {
    return (
      <div>

        <nav>

          <h2>naam kya rkhna h web</h2>

          <div className="nav-links">

            <a onClick={() => setPage("home")}>
              Home
            </a>

            <a onClick={() => setPage("explore")}>
              Problems
            </a>

            <a>
              Universities <span>⌄</span>
            </a>

            <a>
              About <span>⌄</span>
            </a>

          </div>

          <button onClick={() => setPortal("User")}>
            Login
          </button>

        </nav>


        <main>

          <section>

            <h1>Explore Problems</h1>

            <p>
              Discover real-world problems that need solutions.
            </p>

            {/* SEARCH */}

            <input
              type="text"
              placeholder="🔍 Search problems..."
              style={{
                width: "80%",
                maxWidth: "600px",
                padding: "15px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.3)",
                background: "rgba(255,255,255,0.1)",
                color: "white",
                fontSize: "16px",
                marginBottom: "30px"
              }}
            />

            {/* PROBLEM CARDS */}

            <div className="steps">

              <div>

                <h3>Waterlogging Prediction</h3>

                <p>
                  A city needs a system to predict areas
                  that are likely to experience waterlogging
                  during heavy rainfall.
                </p>

                <button>
                  View Problem
                </button>

              </div>


              <div>

                <h3>Crop Disease Detection</h3>

                <p>
                  Farmers need an affordable system to
                  identify crop diseases at an early stage.
                </p>

                <button>
                  View Problem
                </button>

              </div>


              <div>

                <h3>Waste Management</h3>

                <p>
                  A local community needs a smarter way
                  to monitor and improve waste collection.
                </p>

                <button>
                  View Problem
                </button>

              </div>

            </div>


            <button
              className="back-button"
              onClick={() => setPage("home")}
            >
              ← Back to Home
            </button>

          </section>

        </main>

      </div>
    );
  }


  // HOMEPAGE
  return (
    <div>

      <nav>

        <h2>naam kya rkhna h web</h2>

        <div className="nav-links">

          <a onClick={() => setPage("home")}>
            Home <span>⌄</span>
          </a>

          <a onClick={() => setPage("explore")}>
            Problems <span>⌄</span>
          </a>

          <a>
            Universities <span>⌄</span>
          </a>

          <a>
            About <span>⌄</span>
          </a>

        </div>

        <button onClick={() => setPortal("User")}>
          Login
        </button>

      </nav>


      <main>

        {/* HERO */}

        <section className="hero">

          <div className="hero-content">

            <h1>
              Solve Problems.
              <br />
              Create Impact.
            </h1>

            <p>
              thoda sa description bhi
            </p>

            <div className="hero-buttons">

              <button
                onClick={() => setPage("post-problem")}
              >
                Post a Problem
              </button>

              <button
                onClick={() => setPage("explore")}
              >
                Explore Problems
              </button>

            </div>

          </div>


          {/* LOGIN PORTAL */}

          <div className="login-portal">

            <h2>Login Portal</h2>

            <p>
              Select how you want to continue
            </p>

            <button onClick={() => setPortal("Student")}>
              Student
            </button>

            <button onClick={() => setPortal("University")}>
              University
            </button>

            <button onClick={() => setPortal("Organization")}>
              Organization
            </button>

          </div>

        </section>


        {/* HOW IT WORKS */}

        <section className="how-it-works">

          <h2>How the Platform Works</h2>

          <div className="steps">

            <div>
              <h3>1. Post</h3>

              <p>
                Share a real-world problem that needs a solution.
              </p>
            </div>


            <div>
              <h3>2. Analyze</h3>

              <p>
                AI understands the problem and identifies
                the required expertise.
              </p>
            </div>


            <div>
              <h3>3. Connect</h3>

              <p>
                Find universities and people with relevant
                expertise.
              </p>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default App;
