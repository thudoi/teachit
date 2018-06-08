
<?php
// grouping by years
$years = array();
foreach($view->result as $index => $element) {
  $year = format_date(strip_tags($element->node_created),'custom','Y');
  $years[$year][] = $rows[$index];
}
// printing rows by grouped year
$x = 1 ;
foreach($years as $year => $year_rows) {
  print '<div data-tly="'.$year.'"><div class="timeline-year"><span class="years" data-toggle="collapse" data-target="#tly-'.$year.'" aria-expanded="true" >'.$year.'</span></div>';
  print '<div id="tly-'.$year.'" class="collapse in" aria-expanded="true">';
  foreach($year_rows as $id => $row) {
    if($x%2 == 0)
    {
      $class_item = 'item-2';
    }
    else {
      $class_item = 'item-1';
    }
    print '<article class="'.$classes_array[$id]. $class_item .' item  row_item_single">'.$row.'</article>';
    $x++;
  }
  print '</div>';
  print '</div>';
}
?>

