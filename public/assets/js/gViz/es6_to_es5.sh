#!/bin/bash

# Pega o primeiro argumento
dir=$1
if [ $# -eq 0 ]
  then
    echo "É necessário o nome de um diretório para processar"
    exit
fi

for file in $dir/*.js
do
  babel $file -o $file
done

echo "Done"
