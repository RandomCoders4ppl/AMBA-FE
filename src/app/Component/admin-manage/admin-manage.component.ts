import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { HotTableRegisterer } from '@handsontable/angular';
import Handsontable from 'handsontable';
import { CellChange, ChangeSource } from 'handsontable/common';
import { AdminReqType } from 'src/app/Models/AdminReqType';
import { Users } from 'src/app/Models/Users';
import { AdminToolService } from 'src/app/Service/admin-tool.service';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-admin-manage',
  templateUrl: './admin-manage.component.html',
  styleUrls: ['./admin-manage.component.css']
})
export class AdminManageComponent implements AfterViewInit, OnDestroy {


  hotRegisterer = new HotTableRegisterer()
  mt_id = 'hotInstance-user';
  data: Users[] = []

  mtHotSettings: Handsontable.GridSettings = {
    data: this.data,
    columns: [
      {
        title: 'User ID',
        type: 'text',
        data: 'userUuid',
        readOnly: true,
      },
      {
        title: 'Email',
        type: 'text',
        data: 'email',
        readOnly: true
      },
      {
        title: 'Name',
        renderer: 'text',
        data: 'name',
        readOnly: true
      },
      {
        title: 'Role',
        type: 'text',
        data: 'role',
        className: 'htRight',
        readOnly: true
      },
      {
        title: 'Change Role',
        type: 'checkbox',
        data: 'changeRole',
      },
      {
        title: 'DELETE USER',
        type: 'checkbox',
        data: 'deleteUser',
      }
    ],
    colHeaders: true,
    filters: true,
    dropdownMenu: true,
    height: 'auto',
    hiddenColumns: {
      columns: [0],
      indicators: true
    },
    licenseKey: 'non-commercial-and-evaluation',
    afterChange: (changes, src) => {
      if (changes)
        this.onChangeValue(changes, src)
    }
  };

  constructor(private adminTool: AdminToolService, private authService: AuthService) { }

  ngAfterViewInit(): void {
    let hot = this.hotRegisterer.getInstance(this.mt_id);
    hot.addHook
    this.adminTool.getUsersByRole('USER').subscribe(res => {
      res.forEach(ele => {
        ele.role = "USER"
        //ele.changeRole = "<button onclick='onChangeRole()' type='button'> Make Admin</button>"
        this.data.push(ele)
      })
      hot.updateData(this.data)
    })
    this.adminTool.getUsersByRole('ADMIN').subscribe(res => {
      res.forEach(ele => {
        ele.role = "ADMIN"
        //ele.changeRole = "<button onclick='onChangeRole()' type='button'> Make User</button>"
        this.data.push(ele)
      })
      hot.updateData(this.data)
    })
    hot.render()
  }


  onChangeValue(changes: Handsontable.CellChange[], source: string) {
    const instance = this.hotRegisterer.getInstance(this.mt_id);
    if (source === 'edit')
      for (let i = 0; i < changes.length; i++) {
        const [row, prop, oldVal, newVal] = changes[i];
        if (prop === 'changeRole' || prop === 'deleteUser') {
          const email: string = instance.getDataAtCell(row, instance.propToCol('email'))
          const loggedInUser: string = this.authService.getEmail()
          const value1 = instance.getDataAtCell(row, instance.propToCol('changeRole'))
          const value2 = instance.getDataAtCell(row, instance.propToCol('deleteUser'))
          if (value1 == true && value2 == true) {
            alert("Not possible to delete user and Same Time make him Admin")
            instance.setDataAtCell(row, instance.propToCol(prop), oldVal)
          }
          if (email != null && loggedInUser != null && loggedInUser.toLocaleLowerCase() === email.toLocaleLowerCase() && newVal == true) {
            alert("Can't change your Own Role or Delete yourself from here ....")
            instance.setDataAtCell(row, instance.propToCol(prop), oldVal)
          }
        }
      }

  }

  deleteUsers() {
    const instance = this.hotRegisterer.getInstance(this.mt_id);
    const data = instance.getDataAtCol(instance.propToCol('deleteUser'))
    let deleteUsersList: AdminReqType[] = []
    data.forEach((ele, index) => {
      if (ele == true) {
        const userID = instance.getDataAtCell(index, instance.propToCol('userUuid'))
        const Email = instance.getDataAtCell(index, instance.propToCol('email'))
        deleteUsersList.push({ 'userUuid': userID, 'email': Email })
      }
    })
    if (deleteUsersList.length > 0)
      this.adminTool.postChanges("/deleteUsers", deleteUsersList).subscribe(res => {
        res.forEach(ele => {
          const UserUUID = instance.getDataAtProp('userUuid');
          const index = UserUUID.findIndex(e => e === ele.userUuid)
          if(ele.deleted && ele.deleted?.toLowerCase()==="true"){
            this.ChangeRowColor(index,'RipUser')
          }
        })
      })
  }

  onChangeRole() {
    const instance = this.hotRegisterer.getInstance(this.mt_id);
    const data = instance.getDataAtCol(instance.propToCol('changeRole'))
    let changeRoleList: AdminReqType[] = []
    data.forEach((ele, index) => {
      if (ele == true) {
        const userID = instance.getDataAtCell(index, instance.propToCol('userUuid'))
        const Email = instance.getDataAtCell(index, instance.propToCol('email'))
        changeRoleList.push({ 'userUuid': userID, 'email': Email })
      }
    })
    if (changeRoleList.length > 0)
      this.adminTool.postChanges('/ChangeRoles', changeRoleList).subscribe(res => {
        res.forEach(ele => {
          const UserIdCol = instance.getDataAtProp('userUuid');
          const index = UserIdCol.findIndex(e => e === ele.userUuid)
          if (ele.newRole && ele.newRole.trim().length > 0) {
            instance.setDataAtCell(index, instance.propToCol('role'), ele.newRole)
            this.ChangeRowColor(index,'ChangeRoleYes')
          }else  this.ChangeRowColor(index,'ChangeRoleNo')
        })
      })
  }


  ngOnDestroy(): void {
    this.hotRegisterer.getInstance(this.mt_id).destroy();
  }

  ChangeRowColor(rowIndex: number, CssClassName: string) {
    const instance = this.hotRegisterer.getInstance(this.mt_id);
    for (let i = 0; i < instance.countCols(); i++) {
      if(CssClassName === 'RipUser') {
        instance.setDataAtCell(rowIndex, instance.propToCol('deleteUser'), false)
        instance.setCellMeta(rowIndex,i, 'readOnly',true);
      }
      instance.setCellMeta(rowIndex, i, 'className', CssClassName);
    }
    instance.render()
  }





}
