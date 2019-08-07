#include<stdio.h>
#include<stdlib.h>

typedef struct _ListNode
{
	//data field
	int data;

	//link field
	struct _ListNode *link;
}ListNode;

void PrintAll(ListNode *pHead)
{
	ListNode *pNow = pHead;

	printf("Header-> ");
	while (pNow != NULL)
	{
		printf("%d-> ",pNow->data);
	}
	printf("NULL\n");
}

void main()
{
	ListNode *pHead = NULL;

	PrintAll(pHead);
}