#!/bin/bash

set -e
# set -x

VERBOSE=
DRY_RUN=

: "${BACKUP_TO:=${HOME}/backup}"

USAGE()
{
	cat << '__EOU__'
# DESCRIPTION

# USAGE

# OPTIONS

__EOU__
}


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

v()
{
	if [ -n "$VERBOSE" ]
	then
		note "$@"
	fi
}

dryrun_msg()
{
	if [[ -z "$DRY_RUN" ]]
	then
		return
	fi

	while IFS=$'\n' read -r -a line
	do
		line="${line//%/%%}"
		printf "\e[36m[DRYRUN]: ${line}\e[0m\n" >&2
	done <<< "$@"
}

dryrun_msg()
{
	if [[ -z "$DRY_RUN" ]]
	then
		return
	fi

	while IFS=$'\n' read -r -a line
	do
		line="${line//%/%%}"
		printf "\e[36m[DRYRUN]: ${line}\e[0m\n" >&2
	done <<< "$@"
}

exec_cmd()
{
	local cmd
	cmd="$@"

	if [[ "$DRY_RUN" -gt 0 ]]
	then
		dryrun_msg "$cmd"
	else
		(
			set -x;
			$cmd;
		)
	fi
}



main()
{
	while [[ $# -gt 0 ]]; do
		case "$1" in
			-v|--verbose	)
				VERBOSE=1
				;;
			--dry-run		)
				DRY_RUN=1
				;;
			-h|--help		)
				echo "$(USAGE)"
				exit
				;;
			-b|--backup-to		)
				shift
				BACKUP_TO="$1"
				;;
			*)
				echo "Unknown option $1" >&2
				exit
				;;
		esac
		shift
	done

	echo "VERBOSE: $VERBOSE"
	echo "DRY_RUN: $DRY_RUN"
}

main "$@"
