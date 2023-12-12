/* 
    构件列表去重
 */

// 构件列表去重
export const memberDeduplicate = async (_memberList) => {
    try{
        let memberList = _memberList
        const deWeight = () => {
            for (var i = 0; i < memberList.length - 1; i++) {
                for (var j = i + 1; j < memberList.length; j++) {
                    if (memberList[i].position == memberList[j].position
                        &&memberList[i].membertype == memberList[j].membertype
                        &&memberList[i].membername == memberList[j].membername) {
                        memberList.splice(j, 1);
                        //因为数组长度减小1，所以直接 j++ 会漏掉一个元素，所以要 j--
                        j--;
                    }
                }
            }
            return memberList;
        }
        let newMemberList = deWeight()
        return newMemberList
    }catch(e){
      console.log('构件列表去重出错',e);
    }
}