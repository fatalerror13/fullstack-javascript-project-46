.PHONY: install
install:
	npm run install

.PHONY: lint
lint:
	npm run lint

.PHONY: test
test:
	npm run test

.PHONY: run
run:
	gendiff -f json files/file1.json files/file2.json