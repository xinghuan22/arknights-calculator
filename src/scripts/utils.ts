import { ElMessageBox } from 'element-plus'

const info = (msg: string, title: string) => {
  ElMessageBox.alert(msg.replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;'), title, {
    // if you want to disable its autofocus
    // autofocus: false,
    dangerouslyUseHTMLString: true,
    confirmButtonText: 'OK',
    customStyle: {
      'max-width': '40%'
    }
  })
}

export { info }