local VERBOSE=
local DRY_RUN=

while [[ $# > 0 ]]; do
	case "$1" in
		-v|--verbose	)
			VERBOSE=1
			;;
		--dry-run		)
			DRY_RUN=1
			;;
		-h|--help		)
			echo "$USAGE"
			exit
	esac
	shift
done
