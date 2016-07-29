[TOC]

#LinkButton（按钮）
按钮组件使用超链接按钮创建。它使用一个普通的`<a>`标签进行展示。它可以同时显示一个图标和文本,或只有图标或文字。按钮的宽度可以动态和折叠/展开以适应它的文本标签。

##使用案例

### 普通按钮

#### 内联

```
<a href="#nogo" class="webui-linkbutton" >内联按钮</a>
```

#### 定宽

```
<a href="#nogo" class="webui-linkbutton" style="width:120px">定宽按钮</a>
```

#### 百分比宽度

```
<a href="#nogo" class="webui-linkbutton" style="width:15%">百分比宽度</a>
```


#### 不可选

```
<a href="#nogo" class="webui-linkbutton" data-options="disabled:true">不可选</a>
```

#### 提交中

```
<a href="#nogo" class="webui-linkbutton" data-options="selected:true">提交中...</a>
```
### 按钮大小

#### 小尺寸

默认图标使用的是small，使用时可不填写

```
<a href="#nogo" class="webui-linkbutton" data-options="size:'small'">小按钮</a>
```


#### 大尺寸

```
<a href="#nogo" class="webui-linkbutton" data-options="size:'large'">大按钮</a>
```
### 图标按钮

#### 内联按钮

```
<a href="#nogo" class="webui-linkbutton" data-options="iconCls:'icon-add'">Add</a>
```

#### 固定尺寸

```
<a href="#nogo" class="webui-linkbutton" data-options="iconCls:'icon-search'" style="width:120px">Search</a>
```

### API文档

#### 属性

<TABLE >
  <TBODY>
  <TR>
    <TH><STRONG>属性名</STRONG></TH>
    <TH><STRONG>属性值类型</STRONG></TH>
    <TH><STRONG>描述</STRONG></TH>
    <TH><STRONG>默认值</STRONG></TH></TR>
  <TR>
    <TD>id</TD>
    <TD>string</TD>
    <TD>组件的ID属性。</TD>
    <TD>null</TD></TR>
  <TR>
    <TD>disabled</TD>
    <TD>boolean</TD>
    <TD>为true时禁用按钮。</TD>
    <TD>false</TD></TR>
  <TR>
    <TD>toggle</TD>
    <TD>boolean</TD>
    <TD>为true时允许用户切换其状态是被选中还是未选择，可实现checkbox复选效果。<STRONG><FONT 
      color=#ff0000></FONT></STRONG></TD>
    <TD>false</TD></TR>
  <TR>
    <TD>selected</TD>
    <TD>boolean</TD>
    <TD>定义按钮初始的选择状态，true为被选中，false为未选中。<STRONG><FONT 
      color=#ff0000></FONT></STRONG></TD>
    <TD>false</TD></TR>
  <TR>
    <TD>group</TD>
    <TD>string</TD>
    <TD>指定相同组名称的按钮同属于一个组，可实现radio单选效果。<STRONG><FONT 
      color=#ff0000></FONT></STRONG></TD>
    <TD>null</TD></TR>
  <TR>
    <TD>plain</TD>
    <TD>boolean</TD>
    <TD>为true时显示简洁效果。</TD>
    <TD>false</TD></TR>
  <TR>
    <TD>text</TD>
    <TD>string</TD>
    <TD>按钮文字。</TD>
    <TD>''</TD></TR>
  <TR>
    <TD>iconCls</TD>
    <TD>string</TD>
    <TD>显示在按钮文字左侧的图标(16x16)的CSS类ID。</TD>
    <TD>null</TD></TR>
  <TR>
    <TD>iconAlign</TD>
    <TD>string</TD>
    <TD>按钮图标位置。可用值有：<BR>'left','right'<FONT 
      color=#ff0000><STRONG><BR></STRONG><FONT 
      color=#000000>'top','bottom'<STRONG><FONT 
      color=#ff0000></FONT></STRONG></FONT></FONT></TD>
    <TD>left</TD></TR>
  <TR>
    <TD>size</TD>
    <TD>string</TD>
    <TD>按钮大小。可用值有：'small','large'。<STRONG><FONT 
      color=#ff0000></FONT></STRONG></TD>
    <TD>small</TD></TR></TBODY></TABLE>

#### 事件

<TABLE class=doc-table>
  <TBODY>
  <TR>
    <TH>事件名</TH>
    <TH>事件参数</TH>
    <TH><STRONG>描述</STRONG></TH></TR>
  <TR>
    <TD>onClick</TD>
    <TD>none</TD>
    <TD>在点击按钮的时候触发。<STRONG><FONT 
    color=#ff0000></FONT></STRONG></TD></TR></TBODY></TABLE>

#### 方法

<TABLE class=doc-table width="100%">
  <TBODY>
  <TR>
    <TH><STRONG>方法名</STRONG></TH>
    <TH><STRONG>方法参数</STRONG></TH>
    <TH><STRONG>描述</STRONG></TH></TR>
  <TR>
    <TD>options</TD>
    <TD>none</TD>
    <TD>返回属性对象。</TD></TR>
  <TR>
    <TD>resize</TD>
    <TD>param</TD>
    <TD>重置按钮。<STRONG><FONT color=#ff0000></FONT></STRONG> 
      <P>代码示例：</P><PRE>$('#btn').linkbutton('resize', {
	width: '100%',
	height: 32
});</PRE></TD></TR>
  <TR>
    <TD>disable</TD>
    <TD>none</TD>
    <TD>禁用按钮。&nbsp; 
      <P>代码示例：</P><PRE>$('#btn').linkbutton('disable');
</PRE></TD></TR>
  <TR>
    <TD>enable</TD>
    <TD>none</TD>
    <TD>启用按钮。&nbsp; 
      <P>代码示例：</P><PRE>$('#btn').linkbutton('enable');
</PRE></TD></TR>
  <TR>
    <TD>select</TD>
    <TD>none</TD>
    <TD>选择按钮。<STRONG><FONT 
color=#ff0000></FONT></STRONG></TD></TR>
  <TR>
    <TD>unselect</TD>
    <TD>none</TD>
    <TD>取消选择按钮。<STRONG><FONT 
  color=#ff0000></FONT></STRONG></TD></TR></TBODY></TABLE>