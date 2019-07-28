
.bash_profile 


@@ -44,39 +44,31 @@ fi



if tput setaf 1 &> /dev/null; then



	tput sgr0



	if [[ $(tput colors) -ge 256 ]] 2>/dev/null; then



		BLACK=$(tput setaf 190)



		MAGENTA=$(tput setaf 9)



		ORANGE=$(tput setaf 172)



		GREEN=$(tput setaf 190)



		PURPLE=$(tput setaf 141)



		WHITE=$(tput setaf 0)



	else



		BLACK=$(tput setaf 190)



		MAGENTA=$(tput setaf 5)



		ORANGE=$(tput setaf 4)



		GREEN=$(tput setaf 2)



		PURPLE=$(tput setaf 1)



		WHITE=$(tput setaf 7)



	fi



	BOLD=$(tput bold)



	RESET=$(tput sgr0)



else



	BLACK="\033[01;30m"



	MAGENTA="\033[1;31m"



	ORANGE="\033[1;33m"



	GREEN="\033[1;32m"



	PURPLE="\033[1;35m"



	WHITE="\033[1;37m"



	BOLD=""



	RESET="\033[m"



fi







export BLACK



export MAGENTA



export ORANGE



export GREEN



export PURPLE



export WHITE



export BOLD



export RESET





@@ -92,7 +84,7 @@ function parse_git_branch() {



# (http://en.wikipedia.org/wiki/Unicode_symbols)



symbol="⚡ "







export PS1="\[${BOLD}${MAGENTA}\]\u \[$WHITE\]in \[$GREEN\]\w\[$WHITE\]\$([[ -n \$(git branch 2> /dev/null) ]] && echo \" on \")\[$PURPLE\]\$(parse_git_branch)\[$WHITE\]\n$symbol\[$RESET\]"



export PS1="\[${MAGENTA}\]\u \[$RESET\]in \[$GREEN\]\w\[$RESET\]\$([[ -n \$(git branch 2> /dev/null) ]] && echo \" on \")\[$PURPLE\]\$(parse_git_branch)\[$RESET\]\n$symbol\[$RESET\]"



export PS2="\[$ORANGE\]→ \[$RESET\]"







