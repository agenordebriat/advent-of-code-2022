create:
	@DAY=$$(gum input --placeholder "Day to work on"); \
	mkdir -p days/$$DAY && touch days/$$DAY/{input.txt,solution.ts}; \
	gum confirm "Start solving this day's puzzle right away?" \
  && echo "Running 'make watch'... 👀" && make watch || echo "You can always run 'make watch' when you're ready! 🚀"

watch:
	@BRANCH=$$(git branch --show-current | cut -d- -f2); \
	deno run --allow-read --watch days/$$BRANCH/solution.ts
