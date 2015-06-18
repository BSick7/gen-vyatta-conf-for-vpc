#!/bin/sh
BGP_LOCAL_IP_SUBNET1=TUNNEL1_INSIDE_CGW_IP/TUNNEL1_INSIDE_CGW_NETMASK
BGP_LOCAL_IP_SUBNET2=TUNNEL2_INSIDE_CGW_IP/TUNNEL2_INSIDE_CGW_NETMASK
BGP_LOCAL_IP_1=TUNNEL1_INSIDE_CGW_IP
BGP_LOCAL_IP_2=TUNNEL2_INSIDE_CGW_IP
VPN_1_IP=TUNNEL1_OUTSIDE_VPGW_IP
VPN_2_IP=TUNNEL2_OUTSIDE_VPGW_IP
MY_WAN_IP=TUNNEL1_OUTSIDE_CGW_IP
MY_LOCALSUBNET_IP=LOCAL_SUBNET
VPC_CIDR=VPC_REMOTE_SUBNET

ip xfrm policy update dir fwd src $BGP_LOCAL_IP_SUBNET1 dst $BGP_LOCAL_IP_1/32 tmpl src $VPN_1_IP dst $MY_WAN_IP proto esp level required mode tunnel
ip xfrm policy update dir in src $BGP_LOCAL_IP_SUBNET1 dst $BGP_LOCAL_IP_1/32 tmpl src $VPN_1_IP dst $MY_WAN_IP proto esp level required mode tunnel
ip xfrm policy update dir fwd src $VPC_CIDR dst $MY_LOCALSUBNET_IP tmpl src $VPN_1_IP dst $MY_WAN_IP proto esp level required mode tunnel
ip xfrm policy update dir in src $VPC_CIDR dst $MY_LOCALSUBNET_IP tmpl src $VPN_1_IP dst $MY_WAN_IP proto esp level required mode tunnel

ip xfrm policy update dir fwd src $BGP_LOCAL_IP_SUBNET2 dst $BGP_LOCAL_IP_2/32 tmpl src $VPN_2_IP dst $MY_WAN_IP proto esp level required mode tunnel
ip xfrm policy update dir in src $BGP_LOCAL_IP_SUBNET2 dst $BGP_LOCAL_IP_2/32 tmpl src $VPN_2_IP dst $MY_WAN_IP proto esp level required mode tunnel
ip xfrm policy update dir fwd src $VPC_CIDR dst $MY_LOCALSUBNET_IP tmpl src $VPN_2_IP dst $MY_WAN_IP proto esp level required mode tunnel
ip xfrm policy update dir in src $VPC_CIDR dst $MY_LOCALSUBNET_IP tmpl src $VPN_2_IP dst $MY_WAN_IP proto esp level required mode tunnel