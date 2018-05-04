<<<<<<< HEAD
import { activityBarViews } from '../constants';
=======
import { __ } from '~/locale';
import { getChangesCountForFiles, filePathMatches } from './utils';
>>>>>>> master

export const activeFile = state => state.openFiles.find(file => file.active) || null;

export const addedFiles = state => state.changedFiles.filter(f => f.tempFile);

export const modifiedFiles = state => state.changedFiles.filter(f => !f.tempFile);

export const projectsWithTrees = state =>
  Object.keys(state.projects).map(projectId => {
    const project = state.projects[projectId];

    return {
      ...project,
      branches: Object.keys(project.branches).map(branchId => {
        const branch = project.branches[branchId];

        return {
          ...branch,
          tree: state.trees[branch.treeId],
        };
      }),
    };
  });

export const currentMergeRequest = state => {
  if (state.projects[state.currentProjectId]) {
    return state.projects[state.currentProjectId].mergeRequests[state.currentMergeRequestId];
  }
  return null;
};

export const currentProject = state => state.projects[state.currentProjectId];

export const currentTree = state =>
  state.trees[`${state.currentProjectId}/${state.currentBranchId}`];

export const hasChanges = state => !!state.changedFiles.length || !!state.stagedFiles.length;

export const hasMergeRequest = state => !!state.currentMergeRequestId;

export const allBlobs = state =>
  Object.keys(state.entries)
    .reduce((acc, key) => {
      const entry = state.entries[key];

      if (entry.type === 'blob') {
        acc.push(entry);
      }

      return acc;
    }, [])
    .sort((a, b) => b.lastOpenedAt - a.lastOpenedAt);

export const getChangedFile = state => path => state.changedFiles.find(f => f.path === path);
export const getStagedFile = state => path => state.stagedFiles.find(f => f.path === path);

export const isEditModeActive = state => state.currentActivityView === activityBarViews.edit;
export const isCommitModeActive = state => state.currentActivityView === activityBarViews.commit;
export const isReviewModeActive = state => state.currentActivityView === activityBarViews.review;

export const getChangesInFolder = state => path => {
  const changedFilesCount = state.changedFiles.filter(f => filePathMatches(f, path)).length;
  const stagedFilesCount = state.stagedFiles.filter(
    f => filePathMatches(f, path) && !getChangedFile(state)(f.path),
  ).length;

  return changedFilesCount + stagedFilesCount;
};

export const getUnstagedFilesCountForPath = state => path =>
  getChangesCountForFiles(state.changedFiles, path);

export const getStagedFilesCountForPath = state => path =>
  getChangesCountForFiles(state.stagedFiles, path);

// prevent babel-plugin-rewire from generating an invalid default during karma tests
export default () => {};
