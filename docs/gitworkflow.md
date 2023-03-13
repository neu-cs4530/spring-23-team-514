# Git Workflow Help 

We will be using Gitflow Workflow to manage our branches and features. A more in length description of Gitflow Workflow can be found [here](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).

## Gitflow Branch Types 
### Main Branch
The main branch represents our current release for the project. This branch should include all of our working changes from the previous sprint. 
The only branch that will be merged into main will be the develop branch, and this will happen at the end of every sprint. 

### Develop Branch
The develop branch represents our current working version for the project. This branch should include all of our working changes for the current sprint.
The only branches that will be merged into develop will be feature branches. Our develop branch is called `starter-code`. This branch will merge into
the main branch. 

### Feature Branch
The feature branch represents an individual developer's progress for one task. Each feature branch will be named `feature-[HYPHENATED ISSUE NAME]`.
So if my issue was named `Deploy Coveytown to Live Service`, then my feature branch would be named `feature-deploy-coveytown-to-live-service`. A feature
branch should only contain the work for one task. Feature branches will be merged into develop when they are finished and unit tested. After a feature
is completed and merged with develop, then the branch should be deleted. 

