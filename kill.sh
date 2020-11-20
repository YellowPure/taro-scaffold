#!/bin/bash

read -p "输入 你要kill的端口号: " a

for i in `lsof -i:$a | awk '{print $2}' | grep -v 'PID'`;
do kill -9 $i;
done