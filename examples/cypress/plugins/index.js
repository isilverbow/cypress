/**
 * @type {Cypress.PluginConfig}
 */

module.exports = (on, config) => {
  on("task", {
    doesFileExist: (filePath) => {
      return fs.existsSync(filePath);
    },
  });
};
