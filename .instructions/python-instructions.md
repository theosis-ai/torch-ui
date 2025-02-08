# Python Instructions

## design philosophy

the python design philosophy references are:

- [pytorch reference](https://pytorch.org/docs/stable/community/design.html)
- [soumith reference](https://soumith.ch/blog/2021-08-02-growing-opensource.md.html)
- [google reference](https://google.github.io/styleguide/pyguide.html)

- Embrace Pythonic design with minimal abstraction and transparent APIs.
- Favor clarity and consistency over complexity to reduce user confusion.
- Ensure modules are composable, maintainable, and easy to extend.
- Use well-defined error handling and clear documentation for intuitive workflows.
- Preserve performance by minimizing unnecessary overhead in internal operations.
- Promote straightforward testing and maintenance to uphold reliability.
- Always prioritize clear communication and community involvement to foster trust and shared ownership.
- Encourage an open ecosystem where contributions are easy, discussions are active, and community members feel supported.
- Maintain a forward-looking mindset by balancing core stability with iterative innovation based on user feedback.
- Strive for inclusivity in design and execution to empower diverse voices, ensuring accessibility and broad adoption.
- Invest time in nurturing a culture that values transparent collaboration, celebrating each contribution, and preserving design purity.
- Favor a formal but succinct coding style to enhance readability and maintainability.
- Elevate clarity by adhering to explicit naming conventions, docstrings, and structured module organization.
- Enforce consistent formatting and linting to foster seamless collaboration and discovery.
- Prioritize self-documenting code by minimizing ambiguity and leveraging descriptive identifiers.
- Continuously refine code through reviews and iterative improvements for long-term sustainability.

## formatting

for formatting, you use [black](https://black.readthedocs.io/en/stable/) and the [ruff formatter](https://docs.astral.sh/ruff/formatter/)

## linting

for linting, you use the [ruff linter](https://docs.astral.sh/ruff/linter/)

## type hints

for typehints, you use [mypy](https://mypy.readthedocs.io/en/stable/)

- Add type annotations to all function parameters, return values, and relevant variables to enable early detection of type mismatches.
- Use “Optional[...]” for parameters or variables that may be None, and ensure proper handling to avoid runtime errors.
- Run mypy with strict settings (e.g., “mypy --strict”) to enforce best practices and improve code stability.
- Configure mypy (e.g., using a “mypy.ini” or “pyproject.toml”) to define project-wide rules for ignores, strict checks, and exclusion paths.
- Apply gradual typing by introducing type hints incrementally in legacy or complex areas, using “# type: ignore” sparingly.
- Monitor type coverage to identify untyped sections, and refine annotations regularly for better clarity and maintainability.
- Leverage mypy plugins or stubs (e.g., “types-requests”) for external libraries to ensure consistent type checking across dependencies.
- Work with CI pipelines to run mypy checks as part of automated testing, maintaining type integrity and preventing regressions.

## documentation

[google docstrings](https://sphinxcontrib-napoleon.readthedocs.io/en/latest/example_google.html)
[mkdocstrings](https://mkdocstrings.github.io/python/usage/)

- Begin the docstring with a concise one-line summary of the function’s purpose.
- Include a blank line after the summary, then use “Args:” to list parameters with their types and purpose.
- Use “Returns:” to describe what the function gives back, detailing the type and meaning.
- If applicable, add “Raises:” to note possible exceptions and the situations in which they occur.
- Keep text clear, concise, and well-formatted for optimal readability.
- Employ consistent indentation, punctuation, and capitalization throughout.

## testing

[unittest](https://docs.python.org/3/library/unittest.html)
[pytest](https://pytest-cov.readthedocs.io/en/latest/)

- Maintain clear naming conventions to describe test objectives and expected outcomes.
- Employ fixtures or setup/teardown methods to reduce duplication and simplify test maintenance.
- Ensure that each test targets a single behavior or component for easy troubleshooting.
- Use straightforward assertions to validate outcomes, and focus on readability over complexity.
- Leverage pytest’s flexibility (e.g., parametrize) and unittest’s structure (e.g., TestCase) to meet specific project needs.
- Keep tests independent to prevent hidden dependencies and maintain reliability under parallel execution.
- Integrate coverage tools to regularly assess which parts of the code remain untested.
- Comply with project-wide formatting, linting, and type hint standards for consistent, maintainable testing.