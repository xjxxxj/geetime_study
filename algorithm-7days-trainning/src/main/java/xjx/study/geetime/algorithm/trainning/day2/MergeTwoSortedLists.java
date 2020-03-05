package xjx.study.geetime.algorithm.trainning.day2;

import java.util.ArrayList;
import java.util.List;

public class MergeTwoSortedLists {

    public static void main(String[] args) {
        ListNode listNode1 = getListNode(1, 2, 4);
        ListNode listNode2 = getListNode(1, 3, 4);
        ListNode listNode = mergeTwoLists(listNode1, listNode2);
        System.out.println(listNode);
    }

    public static ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode listNode = new ListNode(0);
        //存储根节点的引用
        ListNode resultListNode = listNode;
        int valueOfL1;
        int firstOfL2;
        while (l1 != null && l2 != null) {
            valueOfL1 = l1.val;
            firstOfL2 = l2.val;
            if(valueOfL1 < firstOfL2) {
                listNode.next = new ListNode(valueOfL1);
                l1 = l1.next;
            }else {
                listNode.next = new ListNode(firstOfL2);
                l2 = l2.next;
            }
            listNode = listNode.next;
        }
        if(l1 != null) {
            listNode.next = l1;
        }else if(l2 != null) {
            listNode.next = l2;
        }
        return resultListNode.next;
    }




    public static class ListNode {
      int val;
      ListNode next;
      ListNode(int x) { val = x; }
    }


    public static ListNode getListNode(int ... nums) {
        ListNode listNode = new ListNode(nums[0]);
        ListNode resultListNode = listNode;
        int length = nums.length;
        if(length == 1) {
            return listNode;
        }
        for(int i = 1; i < length; i++) {
            listNode.next = new ListNode(nums[i]);
            listNode = listNode.next;
        }
        return resultListNode;
    }

}
