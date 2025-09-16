"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProjectPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologiesStr, setTechnologiesStr] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [image, setImage] = useState("");
  const [featured, setFeatured] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const router = useRouter();

  const inputClass =
    "w-full rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-800/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";

  function validate(values) {
    const errs = {};
    const urlFields = [
      ["githubUrl", "GitHub URL"],
      ["liveUrl", "Live URL"],
      ["image", "Image URL"],
    ];
    const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/.*)?$/i;
    if (!values.title.trim()) errs.title = "Title is required";
    if (!values.description.trim()) errs.description = "Description is required";
    if (!values.technologiesStr.trim()) errs.technologiesStr = "At least one technology";
    if (!values.githubUrl.trim()) errs.githubUrl = "GitHub URL is required";
    urlFields.forEach(([k, label]) => {
      const v = values[k];
      if (v && !urlRegex.test(v)) errs[k] = `${label} looks invalid`;
    });
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;
    const payload = {
      title: title.trim(),
      description: description.trim(),
      technologiesStr: technologiesStr.trim(),
      githubUrl: githubUrl.trim(),
      liveUrl: liveUrl.trim(),
      image: image.trim(),
    };
    const errs = validate(payload);
    setFieldErrors(errs);
    if (Object.keys(errs).length) return;
    setError("");
    setLoading(true);
    const technologies = payload.technologiesStr.split(",").map(t => t.trim()).filter(Boolean);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: payload.title,
          description: payload.description,
          technologies,
          githubUrl: payload.githubUrl,
          liveUrl: payload.liveUrl || undefined,
          image: payload.image || undefined,
          featured,
        }),
      });
      if (!res.ok) throw new Error("Failed to create project");
      router.push("/admin/projects");
    } catch (err) {
      setError(err.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-8 bg-gradient-to-r from-indigo-400 to-fuchsia-500 bg-clip-text text-transparent">
        Create New Project
      </h1>

      {error && (
        <div
          className="mb-6 rounded-md border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700 dark:border-red-700/40 dark:bg-red-900/30 dark:text-red-200"
          role="alert"
        >
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        aria-busy={loading}
        className="relative rounded-2xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-gray-900/60 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-gray-900/40 shadow-lg p-6 sm:p-8 transition"
      >
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              className={inputClass + (fieldErrors.title ? " ring-2 ring-red-500/60" : "")}
              aria-invalid={!!fieldErrors.title}
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              placeholder="Project title"
            />
            {fieldErrors.title && (
              <p className="text-xs text-red-500" role="alert">
                {fieldErrors.title}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="description" className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              className={inputClass + " min-h-[140px]" + (fieldErrors.description ? " ring-2 ring-red-500/60" : "")}
              aria-invalid={!!fieldErrors.description}
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
              placeholder="Concise project overview..."
            />
            {fieldErrors.description && (
              <p className="text-xs text-red-500" role="alert">
                {fieldErrors.description}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="technologies" className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
              Technologies <span className="text-red-500">*</span>
            </label>
            <input
              id="technologies"
              className={inputClass + (fieldErrors.technologiesStr ? " ring-2 ring-red-500/60" : "")}
              aria-invalid={!!fieldErrors.technologiesStr}
              value={technologiesStr}
              onChange={e => setTechnologiesStr(e.target.value)}
              required
              placeholder="React, Node, MongoDB"
            />
            <small className="text-[11px] text-gray-500 dark:text-gray-400 -mt-1">
              Comma separated list
            </small>
            {fieldErrors.technologiesStr && (
              <p className="text-xs text-red-500" role="alert">
                {fieldErrors.technologiesStr}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="githubUrl" className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
              GitHub URL <span className="text-red-500">*</span>
            </label>
            <input
              id="githubUrl"
              className={inputClass + (fieldErrors.githubUrl ? " ring-2 ring-red-500/60" : "")}
              aria-invalid={!!fieldErrors.githubUrl}
              type="url"
              autoComplete="url"
              value={githubUrl}
              onChange={e => setGithubUrl(e.target.value)}
              required
              placeholder="https://github.com/username/repo"
            />
            {fieldErrors.githubUrl && (
              <p className="text-xs text-red-500" role="alert">
                {fieldErrors.githubUrl}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="liveUrl" className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
              Live URL
            </label>
            <input
              id="liveUrl"
              className={inputClass + (fieldErrors.liveUrl ? " ring-2 ring-red-500/60" : "")}
              aria-invalid={!!fieldErrors.liveUrl}
              type="url"
              autoComplete="url"
              value={liveUrl}
              onChange={e => setLiveUrl(e.target.value)}
              placeholder="https://your-live-demo.com"
            />
            {fieldErrors.liveUrl && (
              <p className="text-xs text-red-500" role="alert">
                {fieldErrors.liveUrl}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="image" className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
              Image URL
            </label>
            <input
              id="image"
              className={inputClass + (fieldErrors.image ? " ring-2 ring-red-500/60" : "")}
              aria-invalid={!!fieldErrors.image}
              type="url"
              autoComplete="url"
              value={image}
              onChange={e => setImage(e.target.value)}
              placeholder="https://..."
            />
            {fieldErrors.image && (
              <p className="text-xs text-red-500" role="alert">
                {fieldErrors.image}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 dark:border-white/10 text-indigo-600 focus:ring-indigo-500"
                checked={featured}
                onChange={e => setFeatured(e.target.checked)}
              />
              Featured project
            </label>
            <small className="text-[11px] text-gray-500 dark:text-gray-400">
              Controls prominence on the site
            </small>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-end mt-10">
          <button
            type="button"
            disabled={loading}
            onClick={() => router.push("/admin/projects")}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-gray-800/60 px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/70 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {loading && (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            )}
            {loading ? "Creating..." : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
}