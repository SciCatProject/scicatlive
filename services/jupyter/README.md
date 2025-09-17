# Jupyter Notebook

This Jupyter Notebook instance is preconfigured with an example notebook that shows the usage of
[Pyscicat](https://github.com/scicatproject/pyscicat).

## [Pyscicat Notebook](./config/notebooks/pyscicat.ipynb)

This notebook demonstrates all the major actions Pyscicat is capable of:

- logging into SciCat backend
- dataset creation
- datablock creation
- attachment upload

## [.env file](./config/.env)

It contains the environment variables for connecting to the backend service deployed by this project

## [Thumbnail image](./config/notebooks/example_files/thumbnail.png)

An example image that is used for the attachment upload demonstration

## Default configuration

This service is only dependant on the backend service, since it demonstrates communication with the latter through
Pyscicat.

The notebooks are mounted to the container from the [config/notebooks](config/notebooks/) directory. The changes to
these notebooks should _not_ be contributed back to this repository, unless this is intentional. In the case you want to
upstream changes to these notebooks, be sure to clear all the results from them.

The [main readme](../../README.md) covers all dependencies of this package.
