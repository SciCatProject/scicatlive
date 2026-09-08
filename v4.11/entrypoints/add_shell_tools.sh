#!/bin/sh

apk update && apk add bash zsh

[ -d /root/.oh-my-zsh ] || \
  RUNZSH=no CHSH=no KEEP_ZSHRC=yes sh -c \
  "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
sed -i 's/^ZSH_THEME=.*/ZSH_THEME="geoffgarside"/' /root/.zshrc
