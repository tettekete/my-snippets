note()
{
	while IFS=$'\n' read -r -a line
	do
		line="${line//%/%%}"
		printf "\e[90m# ${line}\e[0m\n" >&2
	done <<< "$@"
}

warn()
{
	while IFS=$'\n' read -r -a line
	do
		line="${line//%/%%}"
		printf "\e[31m${line}\e[0m\n" >&2
	done <<< "$@"
}

verbose()
{
	if [ -n "$VERBOSE" ]
	then
		while IFS=$'\n' read -r -a line
		do
			line="${line//%/%%}"
			printf "\e[90m# ${line}\e[0m\n" >&2
		done <<< "$@"
	fi
}

