package xjx.study.geetime.algorithm.trainning.day3;

public class MergeSortedArray {

    public static void main(String[] args) {
        int[] num1 = {4, 5, 6, 0, 0, 0};
        int[] num2 = {1, 2, 3};
        merge2(num1, 3, num2, 3);
        System.out.println(num1);
    }
    //通过移动实现
    public static void merge2(int[] nums1, int m, int[] nums2, int n) {
        int index1 = 0;
        for(int i = 0; i < n; ) {
            //nums2剩余全部比nums1大
            if(index1 == i + m) {
                for(int j = i; j < n; j ++) {
                    nums1[index1 ++] = nums2[j];
                }
                break;
            }
            //后移一位
            if(nums1[index1] > nums2[i]) {
                for(int j = m + i; j > index1; j --) {
                    nums1[j] = nums1[j - 1];
                }
                nums1[index1] = nums2[i];
                i ++;
            }
            index1 ++;
        }
    }

    //通过中间数组实现
    public static void merge(int[] nums1, int m, int[] nums2, int n) {
        int[] resultNums = new int[m + n];
        int index1 = 0;
        int index2 = 0;
        int resultIndex = 0;
        int valueOfNums1;
        int valueOfNums2;
        //遍历比较，排序存入resultNums
        while (index1 < m && index2 < n) {
            valueOfNums1 = nums1[index1];
            valueOfNums2 = nums2[index2];
            if(valueOfNums1 > valueOfNums2) {
                resultNums[resultIndex] = valueOfNums2;
                index2 ++;
            }else {
                resultNums[resultIndex] = valueOfNums1;
                index1 ++;
            }
            resultIndex ++;
        }
        //num2有剩余，num1已经全放入resultNums
        if(index1 == m) {
            for(int i = 0; i < resultIndex; i++) {
                nums1[i] = resultNums[i];
            }
            //将num2剩余的放入num1
            for(int j = index2; j < n; j++) {
                nums1[resultIndex] = nums2[j];
                resultIndex ++;
            }
        }
        //num1有剩余
        if(index2 == n) {
            //将num1剩余的放入resultNums
            for(int j = index1; j < m; j++) {
                resultNums[resultIndex] = nums1[j];
                resultIndex ++;
            }
            //将resultNums放入num1
            for(int j = 0; j < resultIndex; j++) {
                nums1[j] = resultNums[j];
            }
        }


    }

}
