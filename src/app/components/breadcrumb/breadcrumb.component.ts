import { Component, OnInit } from '@angular/core';
import {SidebarComponent} from '../sidebar/sidebar.component'

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
  providers: [SidebarComponent],
})
export class BreadcrumbComponent implements OnInit {

/*   constructor() { }

  ngOnInit(): void {
  } */
  
  /* Breadcrumb */
  
  menuHeader: any = [];
  appitems = [
    {
      label: 'Item 1',
      icon: 'keyboard_arrow_right',
      items: [
        {
          label: 'Item 1.1',
          link: '/item-1-1',
          icon: 'pan_tool'
        },
        {
          label: 'Item 1.2',
          icon: 'keyboard_arrow_right',
          items: [
            {
              label: 'Item 1.2.1',
              link: '/item-1-2-1',
              icon: 'perm_scan_wifi'
            },
            {
              label: 'Item 1.2.2',
              icon: 'keyboard_arrow_right',
              items: [
                {
                  label: 'Item 1.2.2.1',
                  link: 'item-1-2-2-1',
                  icon: 'room'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      label: 'Item 2',
      icon: 'keyboard_arrow_right',
      items: [
        {
          label: 'Item 2.1',
          link: '/item-2-1',
          icon: 'favorite'
        },
        {
          label: 'Item 2.2',
          link: '/item-2-2',
          icon: 'favorite_border'
        }
      ]
    },
    {
      label: 'Item 3',
      link: '/item-3',
      icon: 'offline_pin'
    },
    {
      label: 'Item 4',
      link: '/item-4',
      icon: 'star_rate',
      hidden: true
    }
  ];

  constructor() { }

  ngOnInit() {
    this.appitemsTravel = this.appitems;
  }

  breadCrumbMain() {
    this.appitemsTravel = this.appitems;
    this.menuHeader = [];
  }

  appitemsTravel;

  breadCrumb(menu, index) {
    console.log('sub breadCrumb');
    this.menuHeader.splice(index + 1, this.menuHeader.length - 1);
    if (menu[index] && menu[index].items && menu[index].items.length) {
      this.appitemsTravel = menu[index].items;
    }
  }

  menuChange(menuChange) {

    if (menuChange.items) {

      this.appitemsTravel = menuChange.items;
      this.menuHeader.push({ label: menuChange.label, icon: 'keyboard_arrow_right', items: menuChange.items });
      // this.menuHeader.push(menuChange);

      console.log('hasMultiMenuLabel');
    }
  }



}
