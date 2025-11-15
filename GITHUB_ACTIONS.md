# GitHub Actions Guide

This document explains how to access and use GitHub Actions in this repository.

## What are GitHub Actions?

GitHub Actions is GitHub's built-in CI/CD (Continuous Integration/Continuous Deployment) platform that allows you to automate workflows such as:
- Running tests and linting
- Building your application
- Deploying to production
- Running security scans
- And much more!

## How to Access GitHub Actions

### Method 1: Via GitHub Web Interface

1. **Navigate to the Repository:**
   - Go to https://github.com/hasan-js-py-dev/alhamdualliah_sass_frontend_Daddy_leads

2. **Open the Actions Tab:**
   - Click on the **"Actions"** tab in the top navigation bar
   - This is located between "Pull requests" and "Projects"

3. **View Workflows:**
   - You'll see a list of all workflows in the repository
   - The left sidebar shows workflow names
   - The main area shows recent workflow runs with their status

### Method 2: Direct URL

You can access the Actions page directly at:
```
https://github.com/hasan-js-py-dev/alhamdualliah_sass_frontend_Daddy_leads/actions
```

## Understanding Workflow Runs

### Workflow Status Indicators

- ✅ **Green checkmark**: Workflow succeeded
- ❌ **Red X**: Workflow failed
- 🟡 **Yellow circle**: Workflow in progress
- ⚪ **Gray circle**: Workflow queued/waiting

### Viewing Workflow Details

1. Click on any workflow run to see details
2. Click on a job name (e.g., "lint-and-build") to see step-by-step logs
3. Each step shows:
   - Status (success/failure)
   - Execution time
   - Detailed console output

### Downloading Artifacts

If a workflow produces build artifacts:
1. Scroll to the bottom of the workflow run page
2. Look for the "Artifacts" section
3. Click on an artifact name to download it

## Manually Triggering Workflows

Some workflows can be triggered manually using the `workflow_dispatch` event:

1. Go to the **Actions** tab
2. Select the workflow from the left sidebar (e.g., "CI")
3. Click the **"Run workflow"** button (top right)
4. Select the branch you want to run on
5. Click **"Run workflow"** to start

## Current Workflows

### CI Workflow

**File:** `.github/workflows/ci.yml`

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches
- Manual trigger via workflow_dispatch

**What it does:**
- Checks out the code
- Sets up Node.js (versions 18.x and 20.x)
- Installs dependencies
- Runs ESLint to check code quality
- Builds the project with Vite
- Uploads build artifacts (from Node 20.x build only)

**Duration:** Typically 2-4 minutes

## Adding or Modifying Workflows

### Workflow File Structure

Workflows are YAML files located in `.github/workflows/` directory:

```yaml
name: Workflow Name

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  job-name:
    runs-on: ubuntu-latest
    steps:
      - name: Step name
        run: command to run
```

### Common Triggers

- `push`: When code is pushed
- `pull_request`: When a PR is opened/updated
- `schedule`: Run on a schedule (cron)
- `workflow_dispatch`: Manual trigger
- `release`: When a release is created

### Best Practices

1. **Keep workflows fast**: Split long jobs into parallel jobs
2. **Use caching**: Cache dependencies to speed up runs
3. **Fail fast**: Stop on first error to save time
4. **Use secrets**: Store sensitive data in GitHub Secrets
5. **Test locally**: Use tools like `act` to test workflows locally

## Managing Secrets

For workflows that need sensitive data (API keys, tokens):

1. Go to repository **Settings**
2. Click **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Add name and value
5. Use in workflows: `${{ secrets.SECRET_NAME }}`

## Workflow Permissions

### Required Permissions

To manage workflows, you need:
- **Read access**: View workflow runs
- **Write access**: Trigger manual workflows
- **Admin access**: Modify workflow files and settings

### Repository Permissions

Workflows can access:
- Repository code (checkout)
- GitHub API (with GITHUB_TOKEN)
- External services (with configured secrets)

## Troubleshooting

### Workflow Not Running

**Check:**
- Is the trigger condition met? (correct branch, event type)
- Is the workflow file valid YAML?
- Are there syntax errors in the workflow?

**Solution:**
- Review the workflow file syntax
- Check the trigger conditions match your scenario
- Look for error messages in the Actions tab

### Workflow Failing

**Steps:**
1. Click on the failed workflow run
2. Identify which job/step failed
3. Click on the failed step to see logs
4. Read error messages carefully
5. Fix the issue and push again

### Common Issues

- **Dependencies not installing**: Check package.json and lock file
- **Build failing**: Check for TypeScript/ESLint errors
- **Tests failing**: Run tests locally first
- **Permissions error**: Check repository settings and secrets

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax Reference](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)

## Need Help?

If you're having issues with GitHub Actions:
1. Check the workflow run logs for error messages
2. Review this guide for common solutions
3. Search GitHub Actions documentation
4. Ask in repository discussions or issues
