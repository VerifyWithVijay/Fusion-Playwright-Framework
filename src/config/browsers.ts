import { Project } from "@playwright/test";

export const browserProjects: Record<string, Project> = {
    chromium: {
        name: "Chromium",
        use: {
            browserName: "chromium",
        },
    },

    firefox: {
        name: "Firefox",
        use: {
            browserName: "firefox",
        },
    },

    webkit: {
        name: "WebKit",
        use: {
            browserName: "webkit",
        },
    },
};


export function getProjects(browser: string): Project[] {

    const selectedBrowser = browser.toLowerCase();

    if (selectedBrowser === "all") {
        return Object.values(browserProjects);
    }

    if (!browserProjects[selectedBrowser]) {
        throw new Error(
            `Unsupported browser : ${selectedBrowser}`
        );
    }

    return [browserProjects[selectedBrowser]];
}