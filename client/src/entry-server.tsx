import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { Provider } from "react-redux";
import App, { type SsrPageData } from "./App";
import store from "./Redux/store";
import SmoothScrollProvider from "./components/SmoothScrollProvider";

const API_URL = (process.env.SSR_API_URL ?? "https://server.profilegenie.in/api/v1").replace(/\/$/, "");
const PUBLIC_ORIGIN = (process.env.PUBLIC_ORIGIN ?? "https://profilegenie.in").replace(/\/$/, "");

type PageResult = {
  status: number;
  pageData?: SsrPageData;
};

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;");

const safeJson = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");

async function apiPage(pathname: string): Promise<PageResult> {
  const profileMatch = pathname.match(/^\/profile\/(?:1|9510)\/([^/]+)\/?$/);
  const catalogueMatch = pathname.match(/^\/catalogue\/1\/([^/]+)(?:\/.*)?$/);

  if (!profileMatch && !catalogueMatch) return { status: 200 };

  const endpoint = profileMatch
    ? `/portfolio/${encodeURIComponent(profileMatch[1])}`
    : `/catalogue/single/${encodeURIComponent(catalogueMatch![1])}`;

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return { status: response.status === 404 ? 404 : 502 };

    const payload = await response.json();
    const data = payload?.data;
    if (!data || data.isActive === false || data.isPaid === false) return { status: 404 };

    const metaDetails = profileMatch ? data.metaDetails : data.data?.metaDetails;
    return {
      status: 200,
      pageData: {
        kind: profileMatch ? "portfolio" : "catalogue",
        data,
        metaDetails,
      },
    };
  } catch {
    return { status: 502 };
  }
}

function seoHead(pathname: string, pageData?: SsrPageData) {
  const content = pageData?.data as Record<string, any> | undefined;
  const entity = pageData?.kind === "catalogue" ? content?.data : content;
  const meta = pageData?.metaDetails;
  const title = meta?.title ? `${meta.title} | Profile Genie` : entity?.fullName || entity?.name || "Profile Genie";
  const description = meta?.description || entity?.shortDescription || entity?.description || "Create and manage your professional digital presence with Profile Genie.";
  const image = pageData?.kind === "portfolio"
    ? meta?.favIcon?.url || entity?.image?.url || `${PUBLIC_ORIGIN}/profilegenie.png`
    : meta?.favIcon?.url || entity?.heroImage?.url || entity?.logo?.url || `${PUBLIC_ORIGIN}/profilegenie.png`;
  const canonical = `${PUBLIC_ORIGIN}${pathname}`;
  const schema = pageData?.kind === "catalogue"
    ? { "@context": "https://schema.org", "@type": "Organization", name: entity?.name, description, url: canonical, logo: entity?.logo?.url }
    : pageData?.kind === "portfolio"
      ? { "@context": "https://schema.org", "@type": "Person", name: entity?.fullName, description, url: canonical, image: entity?.image?.url }
      : { "@context": "https://schema.org", "@type": "WebSite", name: "Profile Genie", url: PUBLIC_ORIGIN };

  return `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="index,follow" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:site_name" content="Profile Genie" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
    <script type="application/ld+json">${safeJson(schema)}</script>`;
}

export async function render(url: string) {
  const parsedUrl = new URL(url, PUBLIC_ORIGIN);
  const { status, pageData } = await apiPage(parsedUrl.pathname);
  const app = renderToString(
    <Provider store={store}>
      <StaticRouter location={parsedUrl.pathname}>
        <SmoothScrollProvider>
          <App ssrPageData={pageData} />
        </SmoothScrollProvider>
      </StaticRouter>
    </Provider>
  );

  return {
    status,
    app,
    head: seoHead(parsedUrl.pathname, pageData),
    state: safeJson(pageData ?? null),
  };
}
