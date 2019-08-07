#include<stdio.h>
#include<stdlib.h>
typedef struct ListNode
{
	struct ListNode *next;
	char item;
}ListNode;
typedef struct
{
	ListNode *top;
}ListType;
void push(ListType *p,char s)
{
	ListNode *tmp;
	tmp=(ListNode *)malloc(sizeof(ListNode));
	tmp->item=s;
	tmp->next=p->top;
	p->top=tmp;
}
int pop(ListType *p,char s)
{
	int r=0;
	ListNode *tmp=p->top;
	if((p->top->item=='(' && s==')')||(p->top->item=='{' && s=='}')||(p->top->item=='[' && s==']'))
	{
		p->top=p->top->next;
		free(tmp);
	}
	else
		r=-1;
	return r;
}
int main()
{
	int cnt=0,flag=0,swi=0;
	ListType *tp;
	char ch;
	tp=(ListType *)malloc(sizeof(ListType));
	tp->top=NULL;
	while(1)
	{
		scanf("%c",&ch);
		if(ch=='\n')
			break;
		if(ch=='(' || ch=='[' || ch=='{')
		{
			cnt++;
			push(tp,ch);
		}
		else if(ch==')' || ch==']' || ch=='}')
		{
			cnt++;
			if(tp->top==NULL)
				flag=-1;
			else
			{
				if(swi==0)
					swi=pop(tp,ch);
				else
					pop(tp,ch);
			}
		}
	}
	if((tp->top==NULL) && (flag==0)&&(swi==0))
		printf("OK_%d\n",cnt);
	else
		printf("Wrong_%d\n",cnt);
	free(tp);
}