# velocity-cli

CLI tool for using Meteor Velocity to test your Meteor apps.

## Install

```sh
npm install velocity-cli -g
```

## Testing a package

### Watch mode

This command runs the tests each time you change something.

```sh
velocity test-package my-package
```

### Continuous Integration mode

This command runs the tests only once and then exits with the status code.

```sh
velocity test-package my-package --ci
```

### More options

The command supports a lot more options. You can find a list [here](https://github.com/meteor/meteor/blob/120febbf8a40f262e436d907ff36e469a19d7698/tools/commands.js#L1295-L1339).
