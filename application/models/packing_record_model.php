<?php
if (! defined('BASEPATH'))
    exit('No direct script access allowed');

// 会员
class packing_record_model extends content_model
{
    function __construct ()
    {
        parent::__construct();
        $this->table = 'zy_packing_record';
    }

    public function get_current_all_packing($uId){
        $result = $this->db->query("SELECT a.id AS packing_record_id,a.goodsId,a.packingId,a.startPackingTime,a.endPackingTime,a.status,b.goodsName FROM zy_packing_record a , zy_goods b WHERE a.uId=$uId AND a.status!=0 AND a.status !=3 AND b.id=a.packingId ORDER BY a.id ASC ;")->result_array();
        return $result;
    }





}
