module.exports = function isCommand(args, command) {
  return args[0] === command;
};
