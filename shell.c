#include <sys/types.h>
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <sys/wait.h>
#include <string.h>
#define MAX_LINE 80
char PATH[20][80] = {"/bin","/usr/bin"};
char cmd[MAX_LINE+1];
int main(){
  int shoud_run=1;
  while(shoud_run){
    printf("sh> ");
    fflush(stdout);
    scanf(" %[^\n]s",cmd);
    if(interno(cmd)){

    }else{
      pid_t p = fork();
      if(p<0){
        printf("erro ao criar filho\n");
      }else{
        if(p){
          wait(NULL);
        }else{
          char command[80] = "/usr/bin/";
          strcat(command,cmd);
          char *params[2]={cmd,0};
          execve(command,params,NULL);
        }
      }
    }
  }
  exit(0);
}
