module.exports = function replaceCommand(args, oldCommand, newCommand) {
  if (args[0] === oldCommand) {
    return [newCommand].concat(args.slice(1));
  } else {
    return args;
  }
};
