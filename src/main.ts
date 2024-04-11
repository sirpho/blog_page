import "../public/iconfont.js";
import { createApp } from "vue";
import { createPinia } from "pinia";

// @ts-ignore
import App from "./App.vue";
import router from "./router";

import {
  Message,
  Input,
  Divider,
  Card,
  Avatar,
  Tag,
  Space,
  Empty,
  Form,
  Button,
  Select,
  Radio,
  Pagination,
  Upload,
  Popconfirm,
  Link,
  Image,
  Switch,
  Affix,
  Table,
  Skeleton
} from "@arco-design/web-vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);

// arco组件引入
app.use(Message);
app.use(Input);
app.use(Divider);
app.use(Card);
app.use(Avatar);
app.use(Tag);
app.use(Space);
app.use(Empty);
app.use(Form);
app.use(Button);
app.use(Select);
app.use(Radio);
app.use(Pagination);
app.use(Upload);
app.use(Popconfirm);
app.use(Table);
app.use(Link);
app.use(Image);
app.use(Affix);
app.use(Switch);
app.use(Skeleton);

// markdown组件
import VueMarkdownEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";

// 引入所有语言包
import hljs from "highlight.js";

VueMarkdownEditor.use(githubTheme, {
  Hljs: hljs
});

app.use(VueMarkdownEditor);
import "./style/main.less";

app.mount("#app");
