class SmallestExceptSelf {  
    public static int[] findSmallestExceptSelf(int[] arr) {
        int n = arr.length;
        int[] result = new int[n];
        
        // Find min and second min
        int min1 = Integer.MAX_VALUE, min2 = Integer.MAX_VALUE;
        
        for (int num : arr) {
            if (num < min1) {
                min2 = min1;
                min1 = num;
            } else if (num < min2 && num != min1) {
                min2 = num;
            }
        }
        
        // Fill result
        for (int i = 0; i < n; i++) {
            result[i] = (arr[i] == min1) ? min2 : min1;
        }
        
        return result;
    }
    
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        int[] result = findSmallestExceptSelf(arr);
        
        System.out.println("Input:  " + java.util.Arrays.toString(arr));
        System.out.println("Output: " + java.util.Arrays.toString(result));
    }
}