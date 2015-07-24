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

This command runs the tests only once and then exit with the status code.

```sh
velocity test-package my-package --ci
```
