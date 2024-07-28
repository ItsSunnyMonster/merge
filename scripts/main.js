import { Octokit } from "https://esm.sh/@octokit/rest";
import { throttling } from "https://esm.sh/@octokit/plugin-throttling";
import { retry } from "https://esm.sh/@octokit/plugin-retry";

const MyOctokit = Octokit.plugin(throttling, retry);

const octokit = new MyOctokit({
  userAgent: "merge-rs docs selector",
  log: {
    debug: console.debug,
    info: console.info,
    warn: console.warn,
    error: console.error,
  },
  throttle: {
    onRateLimit: (retryAfter, options, octokit, retryCount) => {
      octokit.log.warn(
        `Request quota exhausted for request ${options.method} ${options.url}`
      );

      if (retryCount < 2) {
        octokit.log.info(`Retrying after ${retryAfter} seconds!`);
        return true;
      }
    },
    onSecondaryRateLimit: (retryAfter, options, octokit) => {
      octokit.log.warn(
        `SecondaryRateLimit detected for request ${options.method} ${options.url}`
      );
    },
  },
});

(async () => {
  const data = await octokit.paginate("GET /repos/{owner}/{repo}/branches", {
    owner: "ItsSunnyMonster",
    repo: "merge",
    per_page: 100,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  data.forEach(branch => {
    if (branch.name.startsWith("versions/")) {
      let version = branch.name.slice(9);

      let subDomain = branch.name.replace(/[^A-Za-z0-9-]/g, "-");

      let option = document.createElement('option');
      option.value = subDomain;
      option.innerText = version;

      let optionGroup = document.querySelector("#versions_group");

      optionGroup.appendChild(option);
    }
  });

  let versionSelector = document.querySelector("#version");
  let label = document.querySelector("#label");

  versionSelector.removeAttribute("disabled");
  label.innerText = "Select Version:"
})();

let button = document.querySelector("#go");
let versionSelector = document.querySelector("#version");

button.addEventListener('click', () => {
  if (versionSelector.value === "latest") {
    window.location.href = "https://merge-docs.netlify.app"
    return;
  }

  window.location.href = `https://${versionSelector.value}--merge-docs.netlify.app`;
})
