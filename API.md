## Classes

<dl>
<dt><a href="#Logger">Logger</a></dt>
<dd><p>The y&#39;all&#39;s logger class</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#f">f(string, [options])</a> ⇒ <code>string</code></dt>
<dd><p>Format a string with colors and font</p>
</dd>
</dl>

<a name="Logger"></a>

## Logger
The y'all's logger class

**Kind**: global class  

* [Logger](#Logger)
    * [new Logger([options])](#new_Logger_new)
    * _instance_
        * [.colorized](#Logger+colorized) : <code>boolean</code>
        * [.log_level](#Logger+log_level) : <code>string</code>
        * [.set_log_level(level)](#Logger+set_log_level)
        * [.debug(string)](#Logger+debug)
        * [.info(string)](#Logger+info)
        * [.warn(string)](#Logger+warn)
        * [.error(string)](#Logger+error)
        * [.create_child(namespace, [opts])](#Logger+create_child) ⇒ [<code>Logger</code>](#Logger)
    * _static_
        * [.noop()](#Logger.noop) ⇒ [<code>Logger</code>](#Logger)
        * [.console([namespace], [opts])](#Logger.console) ⇒ [<code>Logger</code>](#Logger)
        * [.callback(cb, [namespace], [opts])](#Logger.callback) ⇒ [<code>Logger</code>](#Logger)

<a name="new_Logger_new"></a>

### new Logger([options])
Constructor


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>object</code> | <code>{}</code> |  |
| options.log | <code>object</code> |  | The internal logger object (basically an object with four keys: debug, info, warn, error; functions that take a string as their only argument) |
| [options.namespace] | <code>string</code> | <code>&quot;​&quot;</code> | The namespace for this logger |
| [options.log_level] | <code>string</code> | <code>&quot;\&quot;info\&quot;&quot;</code> | The log level for this logger |
| [options.no_colors] | <code>boolean</code> | <code>false</code> | Whether to disable colors |
| [options.format] | <code>function</code> |  | A custom format function |

<a name="Logger+colorized"></a>

### logger.colorized : <code>boolean</code>
Check if the logger is colorized

**Kind**: instance property of [<code>Logger</code>](#Logger)  
<a name="Logger+log_level"></a>

### logger.log\_level : <code>string</code>
Get the log level for this logger

**Kind**: instance property of [<code>Logger</code>](#Logger)  
<a name="Logger+set_log_level"></a>

### logger.set\_log\_level(level)
Set the log level for this logger

**Kind**: instance method of [<code>Logger</code>](#Logger)  

| Param | Type | Description |
| --- | --- | --- |
| level | <code>string</code> | The log level |

<a name="Logger+debug"></a>

### logger.debug(string)
Create a debug log

**Kind**: instance method of [<code>Logger</code>](#Logger)  

| Param | Type |
| --- | --- |
| string | <code>string</code> | 

<a name="Logger+info"></a>

### logger.info(string)
Create an info log

**Kind**: instance method of [<code>Logger</code>](#Logger)  

| Param | Type |
| --- | --- |
| string | <code>string</code> | 

<a name="Logger+warn"></a>

### logger.warn(string)
Create a warn log

**Kind**: instance method of [<code>Logger</code>](#Logger)  

| Param | Type |
| --- | --- |
| string | <code>string</code> | 

<a name="Logger+error"></a>

### logger.error(string)
Create an error log

**Kind**: instance method of [<code>Logger</code>](#Logger)  

| Param | Type |
| --- | --- |
| string | <code>string</code> | 

<a name="Logger+create_child"></a>

### logger.create\_child(namespace, [opts]) ⇒ [<code>Logger</code>](#Logger)
Create a new logger namespaced under this one

**Kind**: instance method of [<code>Logger</code>](#Logger)  
**Returns**: [<code>Logger</code>](#Logger) - The new logger  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| namespace | <code>string</code> |  | The namespace for the new logger (is appended onto this namespace) |
| [opts] | <code>object</code> | <code>{}</code> | any options to pass to the new logger's constructor (omissions are defaulted to this logger's options) |

<a name="Logger.noop"></a>

### Logger.noop() ⇒ [<code>Logger</code>](#Logger)
Create a new logger, which does nothing

**Kind**: static method of [<code>Logger</code>](#Logger)  
**Returns**: [<code>Logger</code>](#Logger) - The new logger  
<a name="Logger.console"></a>

### Logger.console([namespace], [opts]) ⇒ [<code>Logger</code>](#Logger)
Create a new logger that logs to the console

**Kind**: static method of [<code>Logger</code>](#Logger)  
**Returns**: [<code>Logger</code>](#Logger) - The new logger  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [namespace] | <code>string</code> | <code>&quot;​&quot;</code> | The namespace for the new logger |
| [opts] | <code>object</code> | <code>{}</code> | any options to pass to the new logger's constructor |

<a name="Logger.callback"></a>

### Logger.callback(cb, [namespace], [opts]) ⇒ [<code>Logger</code>](#Logger)
Create a new logger that logs to a callback function

The callback function is called with the following arguments:
- type: the type of log entry (debug, info, warn, error)
- string: the log entry string

**Kind**: static method of [<code>Logger</code>](#Logger)  
**Returns**: [<code>Logger</code>](#Logger) - The new logger  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cb | <code>function</code> |  | The callback function |
| [namespace] | <code>string</code> | <code>&quot;​&quot;</code> | The namespace for the new logger |
| [opts] | <code>object</code> | <code>{}</code> | any options to pass to the new logger's constructor |

<a name="f"></a>

## f(string, [options]) ⇒ <code>string</code>
Format a string with colors and font

**Kind**: global function  
**Returns**: <code>string</code> - The formatted string  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| string | <code>string</code> |  | The string to format |
| [options] | <code>object</code> | <code>{}</code> |  |
| [options.color] | <code>string</code> | <code>&quot;white&quot;</code> | The color to use, name (e.g. 'red') or hex (e.g. '#ff0000') |
| [options.bold] | <code>boolean</code> | <code>false</code> | Whether to use bold font |

