# generator-eha

A Yo generator for scaffolding out Angular.js apps and components

## Usage

### Prerequisites

- Yeoman

```bash
# Install the generator
npm i -g generator-eha

# Create a directory for your component and change directory
mkdir component-name && cd component-name

# Run it, follow prompts
yo eha:component
```

## Releasing

To prepare a release issue the `grunt release` with along with an appropriate release bump target in accordance with [SemVer](http://semver.org/) with one of either `major`, `minor`, or `patch` like so:

```bash
grunt release:major|minor|patch
```

This will update the `package.json` version, make a commit and tag the commit.

Push to the remote, and remember to push tags to the upstream.

### Publishing to npm

To publish a new version to npm, simply issue from the command line prior making a release (i.e.issuing a `grunt release` and pushing both commits and tags to the upstream):

```
npm publish
```

### Publishing to bower

Publishing to bower is slightly simpler in so far that you only have to do it once, and not explicitly for every release like npm:

e.g.

```
bower register generator-eha https://github.com/eHealthAfrica/generator-eha.git
```

## License

Copyright 2015 Matt Richards (eHealthAfrica)

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.  You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the License for the specific language governing permissions and limitations under the License.
