package xjx.study.geetime.algorithm.trainning.day2;

/**
 * 题目描述：将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
 */

public class MergeTwoSortedLists {

    public static void main(String[] args) {
        ListNode listNode11 = getListNode(1, 2, 4);
        ListNode listNode12 = getListNode(1, 3, 4);
        ListNode listNode21 = getListNode(1, 2, 4);
        ListNode listNode22 = getListNode(1, 3, 4);
        ListNode listNode = mergeTwoLists(listNode11, listNode12);
        ListNode listNode3 = mergeTwoLists2(listNode21, listNode22);
        System.out.println(listNode);
        System.out.println(listNode3);
    }

    //递归实现
    public static ListNode mergeTwoLists2(ListNode l1, ListNode l2) {
        if(l1 == null) {
            return l2;
        }
        if(l2 == null) {
            return l1;
        }
        if(l1.val > l2.val) {
            l2.next = mergeTwoLists2(l1, l2.next);
            return l2;
        }
        l1.next = mergeTwoLists2(l1.next, l2);
        return l1;

    }

    //循环实现
    public static ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode listNode = new ListNode(0);
        //存储根节点的引用
        ListNode resultListNode = listNode;
        int valueOfL1;
        int valueOfL2;
        while (l1 != null && l2 != null) {
            valueOfL1 = l1.val;
            valueOfL2 = l2.val;
            if(valueOfL1 < valueOfL2) {
                listNode.next = new ListNode(valueOfL1);
                l1 = l1.next;
            }else {
                listNode.next = new ListNode(valueOfL2);
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

        @Override
        public String toString() {
            StringBuffer stringBuffer = new StringBuffer("{" + val);
            ListNode tempNext = next;
            while (tempNext != null) {
                stringBuffer.append(", " + tempNext.val);
                tempNext = tempNext.next;
            }
            stringBuffer.append("}");
            return stringBuffer.toString();
        }
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
