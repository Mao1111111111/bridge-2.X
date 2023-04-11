export default function reducer(state, action) {
  return {
    ...state,
    //type相当于变量名， action.payload相当于更新的变量值
    [action.type]: action.payload,
  };
}
