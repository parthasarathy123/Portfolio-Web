export interface SourceBreakdown {
  category: "AI Search" | "Social" | "Direct / Search" | "Other";
  source: string;
  visitors: number;
  percentage: number;
}

export interface MetricStatus {
  value: string;
  status: "good" | "needs-improvement" | "poor";
  target: string;
}

export interface SectionEngagement {
  section: string;
  views: number;
  trend: string;
}

export interface MetricsDigestData {
  generatedAt: string;
  period: string;
  siteUrl: string;
  deploymentStatus: {
    state: string;
    url: string;
    lastDeployedAt?: string;
    commitMessage?: string;
  };
  trafficSummary: {
    totalVisitors: number;
    pageViews: number;
    growthVsLastWeek: string;
    sources: SourceBreakdown[];
  };
  coreWebVitals: {
    overallStatus: "Good" | "Needs Improvement" | "Poor";
    lcp: MetricStatus; // Largest Contentful Paint (<2.5s)
    inp: MetricStatus; // Interaction to Next Paint (<200ms)
    cls: MetricStatus; // Cumulative Layout Shift (<0.1)
  };
  topSections: SectionEngagement[];
  insights: string[];
}

export function generateDigestHtml(data: MetricsDigestData): string {
  const getBadgeColor = (status: "good" | "needs-improvement" | "poor") => {
    switch (status) {
      case "good":
        return "#10B981"; // green
      case "needs-improvement":
        return "#F59E0B"; // amber
      case "poor":
        return "#EF4444"; // red
    }
  };

  const getSourceIcon = (category: string) => {
    switch (category) {
      case "AI Search":
        return "🤖";
      case "Social":
        return "🌐";
      case "Direct / Search":
        return "🔍";
      default:
        return "🔗";
    }
  };

  const sourcesRows = data.trafficSummary.sources
    .map(
      (s) => `
    <tr style="border-bottom: 1px solid #E5E7EB;">
      <td style="padding: 10px 12px; font-size: 14px; color: #1F2937;">
        ${getSourceIcon(s.category)} <strong>${s.source}</strong> 
        <span style="display:inline-block; margin-left:6px; font-size:11px; padding:2px 8px; border-radius:12px; background:#F3F4F6; color:#4B5563;">${s.category}</span>
      </td>
      <td style="padding: 10px 12px; font-size: 14px; text-align: right; font-weight: 600; color: #111827;">${s.visitors.toLocaleString()}</td>
      <td style="padding: 10px 12px; font-size: 14px; text-align: right; color: #6B7280;">${s.percentage}%</td>
    </tr>`
    )
    .join("");

  const sectionRows = data.topSections
    .map(
      (sec) => `
    <tr style="border-bottom: 1px solid #E5E7EB;">
      <td style="padding: 10px 12px; font-size: 14px; color: #1F2937; font-weight: 500;">${sec.section}</td>
      <td style="padding: 10px 12px; font-size: 14px; text-align: right; font-weight: 600; color: #111827;">${sec.views.toLocaleString()} views</td>
      <td style="padding: 10px 12px; font-size: 13px; text-align: right; color: #059669; font-weight: 500;">${sec.trend}</td>
    </tr>`
    )
    .join("");

  const insightsList = data.insights
    .map(
      (insight) => `
    <li style="margin-bottom: 8px; font-size: 14px; color: #374151; line-height: 1.5;">${insight}</li>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Portfolio Weekly Performance Digest</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 24px; background-color: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1F2937;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 640px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); padding: 32px 28px; color: #FFFFFF;">
        <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #38BDF8; font-weight: 700; margin-bottom: 6px;">
          Weekly Analytics & Performance
        </div>
        <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #FFFFFF; line-height: 1.2;">
          Portfolio Performance Digest
        </h1>
        <p style="margin: 8px 0 0; font-size: 14px; color: #94A3B8;">
          Period: <strong>${data.period}</strong> • Site: <a href="${data.siteUrl}" style="color: #38BDF8; text-decoration: none;">${data.siteUrl}</a>
        </p>
      </td>
    </tr>

    <!-- Body Container -->
    <tr>
      <td style="padding: 28px;">
        <!-- Top Stats Cards -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
          <tr>
            <td width="48%" style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px;">
              <div style="font-size: 12px; color: #64748B; text-transform: uppercase; font-weight: 600;">Total Visitors</div>
              <div style="font-size: 26px; font-weight: 800; color: #0F172A; margin: 4px 0;">${data.trafficSummary.totalVisitors.toLocaleString()}</div>
              <div style="font-size: 12px; color: #10B981; font-weight: 600;">${data.trafficSummary.growthVsLastWeek} vs last week</div>
            </td>
            <td width="4%"></td>
            <td width="48%" style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 16px;">
              <div style="font-size: 12px; color: #64748B; text-transform: uppercase; font-weight: 600;">Core Web Vitals</div>
              <div style="font-size: 26px; font-weight: 800; color: ${getBadgeColor(data.coreWebVitals.lcp.status)}; margin: 4px 0;">
                ${data.coreWebVitals.overallStatus}
              </div>
              <div style="font-size: 12px; color: #64748B;">LCP: ${data.coreWebVitals.lcp.value} • CLS: ${data.coreWebVitals.cls.value}</div>
            </td>
          </tr>
        </table>

        <!-- Traffic Attribution -->
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 16px; font-weight: 700; color: #0F172A; margin: 0 0 12px; border-bottom: 2px solid #E2E8F0; padding-bottom: 6px;">
            📊 Traffic & Attribution Sources
          </h2>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
            <thead>
              <tr style="background: #F8FAFC; border-bottom: 2px solid #E2E8F0;">
                <th align="left" style="padding: 8px 12px; font-size: 12px; color: #64748B; text-transform: uppercase;">Source</th>
                <th align="right" style="padding: 8px 12px; font-size: 12px; color: #64748B; text-transform: uppercase;">Visitors</th>
                <th align="right" style="padding: 8px 12px; font-size: 12px; color: #64748B; text-transform: uppercase;">Share</th>
              </tr>
            </thead>
            <tbody>
              ${sourcesRows}
            </tbody>
          </table>
        </div>

        <!-- Core Web Vitals Deep-Dive -->
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 16px; font-weight: 700; color: #0F172A; margin: 0 0 12px; border-bottom: 2px solid #E2E8F0; padding-bottom: 6px;">
            ⚡ Core Web Vitals Health
          </h2>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #E5E7EB;">
              <td style="padding: 10px 12px; font-size: 14px;"><strong>LCP</strong> (Largest Contentful Paint)</td>
              <td style="padding: 10px 12px; font-size: 14px; text-align: center; color: #64748B;">Target: ${data.coreWebVitals.lcp.target}</td>
              <td style="padding: 10px 12px; font-size: 14px; text-align: right; font-weight: 700; color: ${getBadgeColor(data.coreWebVitals.lcp.status)};">
                ${data.coreWebVitals.lcp.value} (${data.coreWebVitals.lcp.status.toUpperCase()})
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #E5E7EB;">
              <td style="padding: 10px 12px; font-size: 14px;"><strong>INP</strong> (Interaction to Next Paint)</td>
              <td style="padding: 10px 12px; font-size: 14px; text-align: center; color: #64748B;">Target: ${data.coreWebVitals.inp.target}</td>
              <td style="padding: 10px 12px; font-size: 14px; text-align: right; font-weight: 700; color: ${getBadgeColor(data.coreWebVitals.inp.status)};">
                ${data.coreWebVitals.inp.value} (${data.coreWebVitals.inp.status.toUpperCase()})
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #E5E7EB;">
              <td style="padding: 10px 12px; font-size: 14px;"><strong>CLS</strong> (Cumulative Layout Shift)</td>
              <td style="padding: 10px 12px; font-size: 14px; text-align: center; color: #64748B;">Target: ${data.coreWebVitals.cls.target}</td>
              <td style="padding: 10px 12px; font-size: 14px; text-align: right; font-weight: 700; color: ${getBadgeColor(data.coreWebVitals.cls.status)};">
                ${data.coreWebVitals.cls.value} (${data.coreWebVitals.cls.status.toUpperCase()})
              </td>
            </tr>
          </table>
        </div>

        <!-- Top Visited Sections -->
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 16px; font-weight: 700; color: #0F172A; margin: 0 0 12px; border-bottom: 2px solid #E2E8F0; padding-bottom: 6px;">
            🚀 Top Visited Sections & Engagement
          </h2>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
            <tbody>
              ${sectionRows}
            </tbody>
          </table>
        </div>

        <!-- Actionable Insights -->
        <div style="margin-bottom: 24px; background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 8px; padding: 16px;">
          <h3 style="margin: 0 0 10px; font-size: 15px; color: #1E40AF; font-weight: 700;">
            💡 Weekly Insights & Recommendations
          </h3>
          <ul style="margin: 0; padding-left: 20px;">
            ${insightsList}
          </ul>
        </div>

        <!-- Deployment Health -->
        <div style="font-size: 12px; color: #64748B; border-top: 1px solid #E2E8F0; padding-top: 16px;">
          <strong>Deployment Health:</strong> Status: <span style="color: #10B981; font-weight: 600;">${data.deploymentStatus.state}</span> • 
          Vercel Project: <code>portfolio-web</code> • Generated at ${data.generatedAt}
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background: #F8FAFC; padding: 20px 28px; text-align: center; border-top: 1px solid #E2E8F0; font-size: 12px; color: #94A3B8;">
        Automated Weekly Digest via GitHub Actions • Powered by Vercel Analytics & Resend
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function generateDigestMarkdown(data: MetricsDigestData): string {
  return `
# 📊 Portfolio Performance Digest (${data.period})
Site: ${data.siteUrl} | Generated: ${data.generatedAt}

## Overview
- **Total Visitors:** ${data.trafficSummary.totalVisitors.toLocaleString()} (${data.trafficSummary.growthVsLastWeek} vs last week)
- **Page Views:** ${data.trafficSummary.pageViews.toLocaleString()}
- **Core Web Vitals:** ${data.coreWebVitals.overallStatus} (LCP: ${data.coreWebVitals.lcp.value}, CLS: ${data.coreWebVitals.cls.value})
- **Deployment Status:** ${data.deploymentStatus.state}

## 🌐 Traffic & Attribution
${data.trafficSummary.sources.map((s) => `- **${s.source}** (${s.category}): ${s.visitors.toLocaleString()} visitors (${s.percentage}%)`).join("\n")}

## ⚡ Core Web Vitals
- **LCP (Largest Contentful Paint):** ${data.coreWebVitals.lcp.value} [Target: ${data.coreWebVitals.lcp.target}] -> ${data.coreWebVitals.lcp.status.toUpperCase()}
- **INP (Interaction to Next Paint):** ${data.coreWebVitals.inp.value} [Target: ${data.coreWebVitals.inp.target}] -> ${data.coreWebVitals.inp.status.toUpperCase()}
- **CLS (Cumulative Layout Shift):** ${data.coreWebVitals.cls.value} [Target: ${data.coreWebVitals.cls.target}] -> ${data.coreWebVitals.cls.status.toUpperCase()}

## 🚀 Top Visited Sections
${data.topSections.map((sec) => `- **${sec.section}**: ${sec.views.toLocaleString()} views (${sec.trend})`).join("\n")}

## 💡 Key Insights
${data.insights.map((insight) => `- ${insight}`).join("\n")}
`;
}
