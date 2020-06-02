#!/bin/bash

GRAY_BOLD="\e[1;25;38;2;191;191;191m"
GRAY_NORMAL="\e[21;25;38;2;191;191;191m"
ORANGE_GOLDEN_BOLD="\e[1;25;38;2;255;215;0m"
ORANGE_NORMAL="\e[21;25;38;2;255;165;0m"
YELLOW_BOLD="\e[1;25;38;2;255;255;0m"
WHITE_BOLD="\e[1;25;38;2;255;255;255m"
WHITE_NORMAL="\e[21;25;38;2;255;255;255m"
CYAN_BOLD="\e[1;25;38;2;0;255;255m"
CYAN_NORMAL="\e[21;25;38;2;0;255;255m"
RED_BOLD="\e[111;25;38;2;255;0;0m"
RED_NORMAL="\e[21;25;38;2;255;0;0m"
RESET="\e[m"

NORMAL=${GRAY_NORMAL}
COMMAND_LINE=${CYAN_NORMAL}
WARNING_FRAME="\e[21;5;38;2;255;165;0m"
WARNING_TITLE=${ORANGE_GOLDEN_BOLD}
WARNING_BODY=${ORANGE_NORMAL}
ERROR_FRAME="\e[21;5;38;2;255;0;0m"
ERROR_TITLE=${RED_BOLD}
ERROR_BODY=${RED_NORMAL}

function warningMessage() {
  local WARNING_MESSAGE=${*}
  local PLAIN_MESSAGE=`echo ${WARNING_MESSAGE} | sed 's/\\\e\[[0-9;]*m//g'`
  local PAD=${PLAIN_MESSAGE//?/─}
  echo -e "│${WARNING_FRAME}╭${PAD}╮${RESET}"
  echo -e "│${WARNING_FRAME}│${WARNING_MESSAGE}${WARNING_FRAME}│${RESET}"
  echo -e "│${WARNING_FRAME}╰${PAD}╯${RESET}"
}

function errorMessage() {
  local ERROR_MESSAGE=${*}
  local PLAIN_MESSAGE=`echo ${ERROR_MESSAGE} | sed 's/\\\e\[[0-9;]*m//g'`
  local PAD=${PLAIN_MESSAGE//?/─}
  echo -e "│${ERROR_FRAME}╭${PAD}╮${RESET}"
  echo -e "│${ERROR_FRAME}│${ERROR_MESSAGE}${ERROR_FRAME}│${RESET}"
  echo -e "│${ERROR_FRAME}╰${PAD}╯${RESET}"
}

function processExitCode() {
  local EXIT_CODE=${LAST_GIT_EXIT_CODE}
  local GIT_COMMAND_LOG=${LAST_GIT_COMMAND_LOG}
  if [ ${EXIT_CODE} -eq 0  ]; then
    echo -e "│    ${NORMAL}    ................................${WHITE_NORMAL}done (Exit code:${WHITE_BOLD}${EXIT_CODE}${WHITE_NORMAL}, logs are in ${GIT_COMMAND_LOG}).${RESET}"
  else 
    echo -e "│    ${ERROR_BODY}    ................................error (${ERROR_TITLE}${EXIT_CODE}${ERROR_BODY})!${RESET}"
    echo -e "│ ${ERROR_TITLE}Errors! ${ERROR_BODY}Last command returned exit code ${ERROR_TITLE}${EXIT_CODE}${ERROR_BODY}, exiting. Logs are stored in ${ERROR_TITLE}${GIT_COMMAND_LOG}${ERROR_BODY}.${RESET}"
    echo -e "╰────────────────────────────────────────────────────────────────────────────────╯"
    exit ${EXIT_CODE}
  fi
}

function doCommand() {
  if [ -z "$*" ]; then
    errorMessage "${ERROR_TITLE}Error!${ERROR_BODY} No git command given, exiting...."
    exit 253
  fi
  local GIT_COMMAND_NAME="GIT_${1}"
  local GIT_COMMAND_PARM_NAME="GIT_${1}_PARM"
  local GIT_COMMAND_LOG_NAME="GIT_${1}_LOG"
  local GIT_COMMAND=${!GIT_COMMAND_NAME}
  local GIT_COMMAND_PARM=${!GIT_COMMAND_PARM_NAME}
  local GIT_COMMAND_LOG=${!GIT_COMMAND_LOG_NAME}
  if [ -z "${GIT_COMMAND}" ]; then
    errorMessage "${ERROR_TITLE}Error!${ERROR_BODY} Git command given (${1}) doesn't resolve to a known command, exiting...."
    exit 252
  fi
  if [ -z "${GIT_COMMAND_PARM}" ]; then
    echo -e "│    ${YELLOW_BOLD}[${COMMAND_LINE}${GIT_COMMAND} &>${GIT_COMMAND_LOG}${YELLOW_BOLD}]${NORMAL}....${RESET}"
    ${GIT_COMMAND} &>"${GIT_COMMAND_LOG}"
  else
    echo -e "│    ${YELLOW_BOLD}[${COMMAND_LINE}${GIT_COMMAND} '${GIT_COMMAND_PARM}' &>${GIT_COMMAND_LOG}${YELLOW_BOLD}]${NORMAL}....${RESET}"
    ${GIT_COMMAND} "${GIT_COMMAND_PARM}" &>"${GIT_COMMAND_LOG}"
  fi
  LAST_GIT_EXIT_CODE=$?
  processExitCode ${LAST_GIT_EXIT_CODE} ${GIT_COMMAND_LOG}
}

function initStuff() {
  if [ -z "$*"  ]; then
    COMMIT_MESSAGE="Some new stuff."
    warningMessage "${WARNING_TITLE}Warning!${WARNING_BODY} No commit message supplied, defaulting to ${GRAY_BOLD}«${WHITE_NORMAL}${COMMIT_MESSAGE}${GRAY_BOLD}»${WARNING_BODY}."
  else 
    COMMIT_MESSAGE=$*
  fi

  GIT_ADD="git add --all ."
  GIT_ADD_PARM=""
  GIT_ADD_LOG="./git_add_last.log"
  rm -f ${GIT_ADD_LOG}

  GIT_COMMIT="git commit -a -m"
  GIT_COMMIT_PARM=${COMMIT_MESSAGE}
  GIT_COMMIT_LOG="./git_commit_last.log"
  rm -f ${GIT_COMMIT_LOG}

  GIT_PUSH="git push"
  GIT_PUSH_PARM=""
  GIT_PUSH_LOG="./git_push_last.log"
  rm -f ${GIT_PUSH_LOG}
}

#╭─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮#
#├─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤#
#├─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤#
#├─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤#
#╰─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯#

echo -e "╭────────────────────────────────────────────────────────────────────────────────╮"
initStuff "${@}"
doCommand ADD
doCommand COMMIT
doCommand PUSH
echo -e "│ ${WHITE_BOLD}All done.${RESET}"
echo -e "╰────────────────────────────────────────────────────────────────────────────────╯"
