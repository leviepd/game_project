<?php

// ** WARNING ** : This file and any that it includes, must be "Portal safe"!

/**
 * Zend Framework
 *
 * LICENSE
 *
 * This source file is subject to the new BSD license that is bundled
 * with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://framework.zend.com/license/new-bsd
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@zend.com so we can send you a copy immediately.
 *
 * @category   Zend
 * @package    Zend
 * @copyright  Copyright (c) 2005-2008 Zend Technologies USA Inc. (http://www.zend.com)
 * @license    http://framework.zend.com/license/new-bsd     New BSD License
 */

class Zend_Exception extends Exception
{}

class Zend_Json_Exception extends Zend_Exception
{}

class Zend_Json_Decoder
{
    const EOF         = 0;
    const DATUM        = 1;
    const LBRACE    = 2;
    const LBRACKET    = 3;
    const RBRACE     = 4;
    const RBRACKET    = 5;
    const COMMA       = 6;
    const COLON        = 7;
    protected $_source;
    protected $_sourceLength;
    protected $_offset;
    protected $_token;
    protected $_decodeType;

    protected function __construct($source, $decodeType)
    {
        
        $this->_source       = $source;
        $this->_sourceLength = strlen($source);
        $this->_token        = self::EOF;
        $this->_offset       = 0;

        
        if (!in_array($decodeType, array(Zend_Json::TYPE_ARRAY, Zend_Json::TYPE_OBJECT)))
        {
            $decodeType = Zend_Json::TYPE_ARRAY;
        }
        $this->_decodeType   = $decodeType;

        
        $this->_getNextToken();
    }

    public static function decode($source = null, $objectDecodeType = Zend_Json::TYPE_ARRAY)
    {
        if (null === $source) {
            throw new Zend_Json_Exception('Must specify JSON encoded source for decoding');
        } elseif (!is_string($source)) {
            throw new Zend_Json_Exception('Can only decode JSON encoded strings');
        }

        $decoder = new self($source, $objectDecodeType);

        return $decoder->_decodeValue();
    }


    protected function _decodeValue()
    {
        switch ($this->_token) {
            case self::DATUM:
                $result  = $this->_tokenValue;
                $this->_getNextToken();
                return($result);
                break;
            case self::LBRACE:
                return($this->_decodeObject());
                break;
            case self::LBRACKET:
                return($this->_decodeArray());
                break;
            default:
                return null;
                break;
        }
    }

    protected function _decodeObject()
    {
        $members = array();
        $tok = $this->_getNextToken();

        while ($tok && $tok != self::RBRACE) {
            if ($tok != self::DATUM || ! is_string($this->_tokenValue)) {
                throw new Zend_Json_Exception('Missing key in object encoding: ' . $this->_source);
            }

            $key = $this->_tokenValue;
            $tok = $this->_getNextToken();

            if ($tok != self::COLON) {
                throw new Zend_Json_Exception('Missing ":" in object encoding: ' . $this->_source);
            }

            $tok = $this->_getNextToken();
            $members[$key] = $this->_decodeValue();
            $tok = $this->_token;

            if ($tok == self::RBRACE) {
                break;
            }

            if ($tok != self::COMMA) {
                throw new Zend_Json_Exception('Missing "," in object encoding: ' . $this->_source);
            }

            $tok = $this->_getNextToken();
        }

        switch ($this->_decodeType) {
            case Zend_Json::TYPE_OBJECT:
                
                $result = new StdClass();
                foreach ($members as $key => $value) {
                    $result->$key = $value;
                }
                break;
            case Zend_Json::TYPE_ARRAY:
            default:
                $result = $members;
                break;
        }

        $this->_getNextToken();
        return $result;
    }

    protected function _decodeArray()
    {
        $result = array();
        $starttok = $tok = $this->_getNextToken(); 
        $index  = 0;

        while ($tok && $tok != self::RBRACKET) {
            $result[$index++] = $this->_decodeValue();

            $tok = $this->_token;

            if ($tok == self::RBRACKET || !$tok) {
                break;
            }

            if ($tok != self::COMMA) {
                throw new Zend_Json_Exception('Missing "," in array encoding: ' . $this->_source);
            }

            $tok = $this->_getNextToken();
        }

        $this->_getNextToken();
        return($result);
    }


    protected function _eatWhitespace()
    {
        if (preg_match(
                '/([\t\b\f\n\r ])*/s',
                $this->_source,
                $matches,
                PREG_OFFSET_CAPTURE,
                $this->_offset)
            && $matches[0][1] == $this->_offset)
        {
            $this->_offset += strlen($matches[0][0]);
        }
    }


    protected function _getNextToken()
    {
        $this->_token      = self::EOF;
        $this->_tokenValue = null;
        $this->_eatWhitespace();

        if ($this->_offset >= $this->_sourceLength) {
            return(self::EOF);
        }

        $str        = $this->_source;
        $str_length = $this->_sourceLength;
        $i          = $this->_offset;
        $start      = $i;

        switch ($str{$i}) {
            case '{':
               $this->_token = self::LBRACE;
               break;
            case '}':
                $this->_token = self::RBRACE;
                break;
            case '[':
                $this->_token = self::LBRACKET;
                break;
            case ']':
                $this->_token = self::RBRACKET;
                break;
            case ',':
                $this->_token = self::COMMA;
                break;
            case ':':
                $this->_token = self::COLON;
                break;
            case  '"':
                $result = '';
                do {
                    $i++;
                    if ($i >= $str_length) {
                        break;
                    }

                    $chr = $str{$i};
                    if ($chr == '\\') {
                        $i++;
                        if ($i >= $str_length) {
                            break;
                        }
                        $chr = $str{$i};
                        switch ($chr) {
                            case '"' :
                                $result .= '"';
                                break;
                            case '\\':
                                $result .= '\\';
                                break;
                            case '/' :
                                $result .= '/';
                                break;
                            case 'b' :
                                $result .= chr(8);
                                break;
                            case 'f' :
                                $result .= chr(12);
                                break;
                            case 'n' :
                                $result .= chr(10);
                                break;
                            case 'r' :
                                $result .= chr(13);
                                break;
                            case 't' :
                                $result .= chr(9);
                                break;
                            case '\'' :
                                $result .= '\'';
                                break;
                            default:
                                throw new Zend_Json_Exception("Illegal escape "
                                    .  "sequence '" . $chr . "'");
                            }
                    } elseif ($chr == '"') {
                        break;
                    } else {
                        $result .= $chr;
                    }
                } while ($i < $str_length);

                $this->_token = self::DATUM;
                
                $this->_tokenValue = $result;
                break;
            case 't':
                if (($i+ 3) < $str_length && substr($str, $start, 4) == "true") {
                    $this->_token = self::DATUM;
                }
                $this->_tokenValue = true;
                $i += 3;
                break;
            case 'f':
                if (($i+ 4) < $str_length && substr($str, $start, 5) == "false") {
                    $this->_token = self::DATUM;
                }
                $this->_tokenValue = false;
                $i += 4;
                break;
            case 'n':
                if (($i+ 3) < $str_length && substr($str, $start, 4) == "null") {
                    $this->_token = self::DATUM;
                }
                $this->_tokenValue = NULL;
                $i += 3;
                break;
        }

        if ($this->_token != self::EOF) {
            $this->_offset = $i + 1; 
            return($this->_token);
        }

        $chr = $str{$i};
        if ($chr == '-' || $chr == '.' || ($chr >= '0' && $chr <= '9')) {
            if (preg_match('/-?([0-9])*(\.[0-9]*)?((e|E)((-|\+)?)[0-9]+)?/s',
                $str, $matches, PREG_OFFSET_CAPTURE, $start) && $matches[0][1] == $start) {

                $datum = $matches[0][0];

                if (is_numeric($datum)) {
                    if (preg_match('/^0\d+$/', $datum)) {
                        throw new Zend_Json_Exception("Octal notation not supported by JSON (value: $datum)");
                    } else {
                        $val  = intval($datum);
                        $fVal = floatval($datum);
                        $this->_tokenValue = ($val == $fVal ? $val : $fVal);
                    }
                } else {
                    throw new Zend_Json_Exception("Illegal number format: $datum");
                }

                $this->_token = self::DATUM;
                $this->_offset = $start + strlen($datum);
            }
        } else {
            throw new Zend_Json_Exception('Illegal Token');
        }

        return($this->_token);
    }
}

class Zend_Json_Encoder
{
    protected $_cycleCheck;

    protected $_visited = array();

    protected function __construct($cycleCheck = false)
    {
        $this->_cycleCheck = $cycleCheck;
    }

    public static function encode($value, $cycleCheck = false)
    {
        $encoder = new self(($cycleCheck) ? true : false);

        return $encoder->_encodeValue($value);
    }

    protected function _encodeValue(&$value)
    {
        if (is_object($value)) {
            return $this->_encodeObject($value);
        } else if (is_array($value)) {
            return $this->_encodeArray($value);
        }

        return $this->_encodeDatum($value);
    }



    protected function _encodeObject(&$value)
    {
        if ($this->_cycleCheck) {
            if ($this->_wasVisited($value)) {
                throw new Zend_Json_Exception(
                    'Cycles not supported in JSON encoding, cycle introduced by '
                    . 'class "' . get_class($value) . '"'
                );
            }

            $this->_visited[] = $value;
        }

        $props = '';
		$comma = '';
        foreach (get_object_vars($value) as $name => $propValue) {
            if (isset($propValue)) {
                $props .= $comma
                        . $this->_encodeValue($name)
                        . ':'
                        . $this->_encodeValue($propValue);
				$comma = ',';
            }
        }

        return '{' . $props . '}';
    }


    protected function _wasVisited(&$value)
    {
        if (in_array($value, $this->_visited, true)) {
            return true;
        }

        return false;
    }


    protected function _encodeArray(&$array)
    {
        $tmpArray = array();

        
        if (!empty($array) && (array_keys($array) !== range(0, count($array) - 1))) {
            
            $result = '{';
            foreach ($array as $key => $value) {
                $key = (string) $key;
                $tmpArray[] = $this->_encodeString($key)
                            . ':'
                            . $this->_encodeValue($value);
            }
            $result .= implode(',', $tmpArray);
            $result .= '}';
        } else {
            
            $result = '[';
            $length = count($array);
            for ($i = 0; $i < $length; $i++) {
                $tmpArray[] = $this->_encodeValue($array[$i]);
            }
            $result .= implode(',', $tmpArray);
            $result .= ']';
        }

        return $result;
    }


    protected function _encodeDatum(&$value)
    {
        $result = 'null';

        if (is_int($value) || is_float($value)) {
            $result = (string)$value;
        } elseif (is_string($value)) {
            $result = $this->_encodeString($value);
        } elseif (is_bool($value)) {
            $result = $value ? 'true' : 'false';
        }

        return $result;
    }


    protected function _encodeString(&$string)
    {
        
        
        $search  = array('\\', "\n", "\t", "\r", "\b", "\f", '"');
        $replace = array('\\\\', '\\n', '\\t', '\\r', '\\b', '\\f', '\"');
        $string  = str_replace($search, $replace, $string);

        
        
        
        $string = str_replace(array(chr(0x08), chr(0x0C)), array('\b', '\f'), $string);

        return '"' . $string . '"';
    }


    private static function _encodeConstants(ReflectionClass $cls)
    {
        $result    = "constants : {";
        $constants = $cls->getConstants();

        $tmpArray = array();
        if (!empty($constants)) {
            foreach ($constants as $key => $value) {
                $tmpArray[] = "$key: " . self::encode($value);
            }

            $result .= implode(', ', $tmpArray);
        }

        return $result . "}";
    }


    private static function _encodeMethods(ReflectionClass $cls)
    {
        $methods = $cls->getMethods();
        $result = 'methods:{';

        $started = false;
        foreach ($methods as $method) {
            if (! $method->isPublic() || !$method->isUserDefined()) {
                continue;
            }

            if ($started) {
                $result .= ',';
            }
            $started = true;

            $result .= '' . $method->getName(). ':function(';

            if ('__construct' != $method->getName()) {
                $parameters  = $method->getParameters();
                $paramCount  = count($parameters);
                $argsStarted = false;

                $argNames = "var argNames=[";
                foreach ($parameters as $param) {
                    if ($argsStarted) {
                        $result .= ',';
                    }

                    $result .= $param->getName();

                    if ($argsStarted) {
                        $argNames .= ',';
                    }

                    $argNames .= '"' . $param->getName() . '"';

                    $argsStarted = true;
                }
                $argNames .= "];";

                $result .= "){"
                         . $argNames
                         . 'var result = ZAjaxEngine.invokeRemoteMethod('
                         . "this, '" . $method->getName()
                         . "',argNames,arguments);"
                         . 'return(result);}';
            } else {
                $result .= "){}";
            }
        }

        return $result . "}";
    }


    private static function _encodeVariables(ReflectionClass $cls)
    {
        $properties = $cls->getProperties();
        $propValues = get_class_vars($cls->getName());
        $result = "variables:{";
        $cnt = 0;

        $tmpArray = array();
        foreach ($properties as $prop) {
            if (! $prop->isPublic()) {
                continue;
            }

            $tmpArray[] = $prop->getName()
                        . ':'
                        . self::encode($propValues[$prop->getName()]);
        }
        $result .= implode(',', $tmpArray);

        return $result . "}";
    }

    public static function encodeClass($className, $package = '')
    {
        $cls = new ReflectionClass($className);
        if (! $cls->isInstantiable()) {
            throw new Zend_Json_Exception("$className must be instantiable");
        }

        return "Class.create('$package$className',{"
                . self::_encodeConstants($cls)    .","
                . self::_encodeMethods($cls)      .","
                . self::_encodeVariables($cls)    .'});';
    }


    public static function encodeClasses(array $classNames, $package = '')
    {
        $result = '';
        foreach ($classNames as $className) {
            $result .= self::encodeClass($className, $package);
        }

        return $result;
    }

}

class Zend_Json
{
    const TYPE_ARRAY  = 1;
    const TYPE_OBJECT = 0;

    public static $maxRecursionDepthAllowed=25;

    public static $useBuiltinEncoderDecoder = false;

    public static function decode($encodedValue, $objectDecodeType = Zend_Json::TYPE_ARRAY)
    {
        if (function_exists('json_decode') && self::$useBuiltinEncoderDecoder !== true) {
            return json_decode($encodedValue, $objectDecodeType);
        }

        return Zend_Json_Decoder::decode($encodedValue, $objectDecodeType);
    }


    public static function encode($valueToEncode, $cycleCheck = false)
    {
        if (function_exists('json_encode') && self::$useBuiltinEncoderDecoder !== true) {
            return json_encode($valueToEncode);
        }

        return Zend_Json_Encoder::encode($valueToEncode, $cycleCheck);
    }

	/*
    public static function fromXml ($xmlStringContents, $ignoreXmlAttributes=true) {   
        $simpleXmlElementObject = simplexml_load_string($xmlStringContents);       
     
        
        if ($simpleXmlElementObject == null) {      
            throw new Zend_Json_Exception('Function fromXml was called with an invalid XML formatted string.');   
        }
       
        $resultArray = null;   
         
        $resultArray = self::_processXml($simpleXmlElementObject, $ignoreXmlAttributes);             
  
        $jsonStringOutput = self::encode($resultArray);
        return($jsonStringOutput);       
    } 

    protected static function _processXml ($simpleXmlElementObject, $ignoreXmlAttributes, $recursionDepth=0) {       
        if ($recursionDepth > self::$maxRecursionDepthAllowed) {      
            throw new Zend_Json_Exception(   
                "Function _processXml exceeded the allowed recursion depth of " .   
                self::$maxRecursionDepthAllowed);      
        } 
     
        if ($recursionDepth == 0) {      
            
            
            $callerProvidedSimpleXmlElementObject = $simpleXmlElementObject;      
        } 
     
        if ($simpleXmlElementObject instanceof SimpleXMLElement) {      
            
            $copyOfSimpleXmlElementObject = $simpleXmlElementObject;      
            
            $simpleXmlElementObject = get_object_vars($simpleXmlElementObject);      
        } 
     
        
        if (is_array($simpleXmlElementObject)) {   
            
            $resultArray = array();      
            
            if (count($simpleXmlElementObject) <= 0) {      
                
                
                return (trim(strval($copyOfSimpleXmlElementObject)));      
            } 
     
            
            foreach($simpleXmlElementObject as $key=>$value) {      
                
                
                
                if(($ignoreXmlAttributes == true) && (is_string($key)) && ($key == "@attributes")) {      
                    continue;      
                } 
     
                
                
                $recursionDepth++;       
                $resultArray[$key] = self::_processXml ($value, $ignoreXmlAttributes, $recursionDepth);      
     
                
                $recursionDepth--;      
            } 
     
            if ($recursionDepth == 0) {      
                
                
                
                
                $tempArray = $resultArray;      
                $resultArray = array();      
                $resultArray[$callerProvidedSimpleXmlElementObject->getName()] = $tempArray;   
            } 
  
            return($resultArray);   
        } else {      
            
            
            return (trim(strval($simpleXmlElementObject)));      
        } 
    } 
	*/
}


function j2o($json)
{
	return Zend_Json::decode($json, Zend_Json::TYPE_OBJECT);
}


function o2j($obj)
{
	return Zend_Json::encode($obj);
}

?>
