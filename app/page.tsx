type ResumeInfo = {
  name: string;
  github: string;
};

type Project = {
  project_name: string;
  project_introduction: string;
  project_github_url: string;
};

async function getResumeInfo(): Promise<ResumeInfo> {
  const res = await fetch(
    "https://raw.githubusercontent.com/startuser0604/first-deploy/refs/heads/main/service/resume_general_info_service.json",
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch resume info");
  return res.json();
}

async function getPortfolio(): Promise<Project> {
  const res = await fetch(
    "https://raw.githubusercontent.com/startuser0604/first-deploy/refs/heads/main/service/resume_portfolio_service.json",
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch portfolio info");
  return res.json();
}

export default async function Home() {
  const resume = await getResumeInfo();
  const project = await getPortfolio();

  return (
    <main className="font-sans min-h-screen p-10 bg-gray-100">
      <div className="max-w-2xl mx-auto bg-white shadow rounded-xl p-8">
        {/* Resume Info */}
        <h1 className="text-3xl font-bold mb-4">{resume.name} Resume</h1>
        <p className="mb-6">
          GitHub:{" "}
          <a
            href={resume.github}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            {resume.github}
          </a>
        </p>

        {/* Portfolio */}
        <h2 className="text-2xl font-semibold mb-3">💼 Portfolio</h2>
        <div className="border rounded-lg p-4 shadow-sm">
          <h3 className="text-xl font-bold">{project.project_name}</h3>
          <p className="text-gray-700 mb-2">{project.project_introduction}</p>
          <a
            href={project.project_github_url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            📂 GitHub Repository
          </a>
        </div>
      </div>
    </main>
  );
}
