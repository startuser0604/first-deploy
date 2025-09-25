type ResumeInfo = {
  name: string;
  github: string;
};

type Project = {
  project_name: string;
  project_introduction: string;
  project_github_url: string;
};

// 기본 정보 JSON 호출
async function getResumeInfo(): Promise<ResumeInfo> {
  const res = await fetch(
    "https://raw.githubusercontent.com/startuser0604/first-deploy/refs/heads/main/service/resume_general_info_service.json",
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch resume info");
  return res.json();
}

// 포트폴리오 JSON 호출
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
        {/* Header */}
        <h1 className="text-3xl font-bold mb-6">안녕 {resume.name} 입니다 👋</h1>

        <p className="mb-4">
          GitHub:{" "}
          <a
            href={resume.github}
            className="text-blue-600 underline"
            target="_blank"
            rel="noreferrer"
          >
            {resume.github}
          </a>
        </p>

        {/* Portfolio Section */}
        <h2 className="text-2xl font-semibold mb-3">💼 Portfolio</h2>
        <div className="border rounded-lg p-4 shadow-sm">
          <h3 className="text-xl font-bold">{project.project_name}</h3>
          <p className="text-gray-700 mb-2">{project.project_introduction}</p>
          <a
            href={project.project_github_url}
            className="text-blue-600 underline"
            target="_blank"
            rel="noreferrer"
          >
             GitHub Repository
          </a>
        </div>
      </div>
    </main>
  );
}
