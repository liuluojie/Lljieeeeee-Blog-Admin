import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Container,
  Header,
  Main,
  Footer,
  Menu,
  MenuItem,
  Submenu,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Table,
  TableColumn,
  Card,
  Tag,
  Empty,
  Switch,
  Pagination,
  Dialog,
  Upload,
  Select,
  Option,
  CheckboxGroup,
  Checkbox,
  Row,
  Col,
  Loading,
  MessageBox
} from "element-ui";


Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Card)
Vue.use(Tag)
Vue.use(Empty)
Vue.use(Switch)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Upload)
Vue.use(Select)
Vue.use(Option)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Row)
Vue.use(Col)
Vue.use(Loading)
Vue.prototype.$message = Message
Vue.prototype.$confirm  = MessageBox.confirm
