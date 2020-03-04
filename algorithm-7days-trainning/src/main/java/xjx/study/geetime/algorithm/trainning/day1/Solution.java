package xjx.study.geetime.algorithm.trainning.day1;
public class Solution {

    public static void rotate(int[] nums, int k) {
        if(nums == null || k < 0){
            System.err.println("nums can not be null and k can not less than 0!");
            return;
        }
        int length = nums.length;
        k = k%length;
        if(length > 1 && k != 0) {
            for (int i = 0; i < k; i++) {
                //右移动一位
                int last = nums[length - 1];
                for (int j = length-1; j > 0; j--) {
                    nums[j] = nums[j-1];
                }
                nums[0] = last;
            }
        }
        System.out.print("[");
        for (int i = 0; i < length-1; i++) {
            System.out.print(nums[i] + ",");
        }
        System.out.print(nums[length-1] + "]");
    }
    public static void rotate2(int[] nums, int k) {
        if(nums == null || k < 0){
            System.err.println("nums can not be null and k can not less than 0!");
            return;
        }
        int length = nums.length;
        k = k%length;
        if(length > 1 && k != 0) {
            //把后面k位存起来
            int[] nums2 = new int[k];
            int temp = length - k;
            for(int i = 0; i < k; i++) {
                nums2[i] = nums[temp + i];
            }
            //前面的(n-k)位右移动k位
            for(int i = temp - 1; i > -1; i--) {
                nums[i + k] = nums[i];
            }
            //把存起来的k位放到前面
            for(int i = 0; i < k; i ++) {
                nums[i] = nums2[i];
            }
        }
        System.out.print("[");
        for (int i = 0; i < length-1; i++) {
            System.out.print(nums[i] + ",");
        }
        System.out.print(nums[length-1] + "]");
    }

    public static void testRotate(int [] nums1, int [] nums2, int [] nums3) {
        rotate(nums1, 1);
        rotate(nums2, 2);
        rotate(nums3, 3);
    }

    public static void testRotate2(int [] nums1, int [] nums2, int [] nums3) {
        rotate2(nums1, 1);
        rotate2(nums2, 2);
        rotate2(nums3, 3);
    }

    public static void main(String[] args) {
        int[] nums1 = new int[]{1};
        int[] nums2 = new int[]{1,2,3,4,5,6,7};
        int[] nums3 = new int[]{-1,-100,3,99};
        testRotate(nums1, nums2, nums3);
        //testRotate2(nums1, nums2, nums3);
    }

}
