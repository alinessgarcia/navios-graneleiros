import os
from supabase import create_client, Client
import json
from datetime import datetime, timedelta
import uuid

# Configuração do Supabase
SUPABASE_URL = "https://cljmddqpxpfoywgwmtkz.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsam1kZHFweHBmb3l3Z3dtdGt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0NzEzNjQsImV4cCI6MjA3MTA0NzM2NH0.LUI_ZuoDdDkun6zFWsQBs-RDnXnbik86_lBtkR204_4"

# Criar cliente Supabase
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def test_connection():
    """Testa a conexão com o Supabase"""
    try:
        # Tenta fazer uma consulta simples
        response = supabase.table('vessels').select('*').limit(1).execute()
        print("✅ Conexão com Supabase estabelecida com sucesso!")
        return True
    except Exception as e:
        print(f"❌ Erro na conexão com Supabase: {e}")
        return False

def load_sample_vessels():
    """Carrega dados de exemplo de navios graneleiros"""
    vessels_data = [
        {
            "imo": "9864679",
            "name": "NAVIOS FELICITY I",
            "flag": "LIBERIA",
            "dwt": 81962,
            "vessel_type": "BULK CARRIER",
            "cargo_capacity_tons": 67000,
            "year_built": 2018,
            "owner_company": "NAVIOS MARITIME HOLDINGS",
            "operator_company": "CARGONAVE",
            "service_speed_knots": 14.5
        },
        {
            "imo": "9971472",
            "name": "SHINE JADE",
            "flag": "PANAMA",
            "dwt": 82376,
            "vessel_type": "BULK CARRIER",
            "cargo_capacity_tons": 64700,
            "year_built": 2020,
            "owner_company": "SHINE SHIPPING",
            "operator_company": "CARGONAVE",
            "service_speed_knots": 14.2
        },
        {
            "imo": "9595876",
            "name": "CK BLUEBELL",
            "flag": "MARSHALL ISLANDS",
            "dwt": 81147,
            "vessel_type": "BULK CARRIER",
            "cargo_capacity_tons": 69030,
            "year_built": 2017,
            "owner_company": "CK LINE",
            "operator_company": "TIBAGI",
            "service_speed_knots": 14.8
        },
        {
            "imo": "9342815",
            "name": "NEW BONANZA",
            "flag": "SINGAPORE",
            "dwt": 76596,
            "vessel_type": "BULK CARRIER",
            "cargo_capacity_tons": 67300,
            "year_built": 2015,
            "owner_company": "BONANZA SHIPPING",
            "operator_company": "CARGONAVE",
            "service_speed_knots": 14.0
        },
        {
            "imo": "9632600",
            "name": "JIN MING 82",
            "flag": "CHINA",
            "dwt": 58018,
            "vessel_type": "BULK CARRIER",
            "cargo_capacity_tons": 52300,
            "year_built": 2016,
            "owner_company": "JIN MING SHIPPING",
            "operator_company": "TIBAGI",
            "service_speed_knots": 13.5
        }
    ]
    
    try:
        # Insere os dados (upsert para evitar duplicatas)
        for vessel in vessels_data:
            response = supabase.table('vessels').upsert(vessel, on_conflict='imo').execute()
        
        print(f"✅ {len(vessels_data)} navios carregados com sucesso!")
        return True
    except Exception as e:
        print(f"❌ Erro ao carregar dados de navios: {e}")
        return False

def load_sample_port_operations():
    """Carrega dados de exemplo de operações portuárias"""
    today = datetime.now().date().isoformat()
    operations_data = [
        {
            "operation_date": today,
            "port_code": "BRPNG",
            "port_name": "Porto de Paranaguá",
            "vessel_imo": "9864679",
            "commodity_type": "AGRICULTURAL",
            "commodity_name": "FARELO DE SOJA",
            "quantity_tons": 67000,
            "operation_type": "export",
            "terminal": "TERMINAL CARGONAVE",
            "berth": "BERTH 214",
            "shipper": "CARGILL AGRICOLA S.A.",
            "consignee": "COFCO INTERNATIONAL",
            "value_usd": 25000000,
            "origin_country": "BRAZIL",
            "origin_state": "PR",
            "origin_city": "PARANAGUA",
            "loading_rate_tons_hour": 1200
        },
        {
            "operation_date": today,
            "port_code": "BRPNG",
            "port_name": "Porto de Paranaguá",
            "vessel_imo": "9971472",
            "commodity_type": "AGRICULTURAL",
            "commodity_name": "MILHO",
            "quantity_tons": 64700,
            "operation_type": "export",
            "terminal": "TERMINAL CARGONAVE",
            "berth": "BERTH 215",
            "shipper": "BUNGE ALIMENTOS S.A.",
            "consignee": "ADM INTERNATIONAL",
            "value_usd": 18000000,
            "origin_country": "BRAZIL",
            "origin_state": "PR",
            "origin_city": "PARANAGUA",
            "loading_rate_tons_hour": 1100
        },
        {
            "operation_date": today,
            "port_code": "BRSSZ",
            "port_name": "Porto de Santos",
            "vessel_imo": "9595876",
            "commodity_type": "AGRICULTURAL",
            "commodity_name": "SOJA",
            "quantity_tons": 69030,
            "operation_type": "export",
            "terminal": "TERMINAL SANTOS BRASIL",
            "berth": "BERTH 37",
            "shipper": "LOUIS DREYFUS COMPANY",
            "consignee": "CARGILL INTERNATIONAL",
            "value_usd": 28000000,
            "origin_country": "BRAZIL",
            "origin_state": "SP",
            "origin_city": "SANTOS",
            "loading_rate_tons_hour": 1300
        }
    ]
    
    try:
        response = supabase.table('port_operations').insert(operations_data).execute()
        print(f"✅ {len(operations_data)} operações portuárias carregadas com sucesso!")
        return True
    except Exception as e:
        print(f"❌ Erro ao carregar operações portuárias: {e}")
        return False

def load_sample_line_ups():
    """Carrega dados de exemplo de programação de navios"""
    today = datetime.now()
    line_ups_data = [
        {
            "vessel_imo": "9342815",
            "vessel_name": "NEW BONANZA",
            "port_code": "BRPNG",
            "port_name": "Porto de Paranaguá",
            "berth_code": "214",
            "berth_name": "BERTH 214",
            "eta": (today + timedelta(days=1)).isoformat(),
            "etd": (today + timedelta(days=4)).isoformat(),
            "status": "programmed",
            "operation_type": "loading",
            "cargo_type": "SOJA",
            "quantity_tons": 67300,
            "priority": 1,
            "source": "mock_data"
        },
        {
            "vessel_imo": "9632600",
            "vessel_name": "JIN MING 82",
            "port_code": "BRPNG",
            "port_name": "Porto de Paranaguá",
            "berth_code": "215",
            "berth_name": "BERTH 215",
            "eta": (today + timedelta(days=2)).isoformat(),
            "etd": (today + timedelta(days=5)).isoformat(),
            "status": "programmed",
            "operation_type": "loading",
            "cargo_type": "SOJA",
            "quantity_tons": 52300,
            "priority": 2,
            "source": "mock_data"
        }
    ]
    
    try:
        response = supabase.table('line_ups').insert(line_ups_data).execute()
        print(f"✅ {len(line_ups_data)} programações de navios carregadas com sucesso!")
        return True
    except Exception as e:
        print(f"❌ Erro ao carregar programações: {e}")
        return False

def load_sample_berth_occupancy():
    """Carrega dados de exemplo de ocupação de berços"""
    today = datetime.now()
    berth_data = [
        {
            "port_code": "BRPNG",
            "port_name": "Porto de Paranaguá",
            "berth_code": "214",
            "berth_name": "BERTH 214",
            "berth_length_meters": 280,
            "berth_depth_meters": 15,
            "berth_capacity_tons": 80000,
            "current_vessel_imo": "9864679",
            "current_vessel_name": "NAVIOS FELICITY I",
            "occupation_start": (today - timedelta(days=1)).isoformat(),
            "estimated_departure": (today + timedelta(days=2)).isoformat(),
            "operation_type": "loading",
            "cargo_type": "FARELO DE SOJA",
            "loading_rate_tons_hour": 1200,
            "completion_percentage": 65,
            "status": "occupied",
            "equipment_available": {"cranes": 2, "conveyors": 4, "hoppers": 6},
            "source": "mock_data"
        },
        {
            "port_code": "BRPNG",
            "port_name": "Porto de Paranaguá",
            "berth_code": "215",
            "berth_name": "BERTH 215",
            "berth_length_meters": 290,
            "berth_depth_meters": 16,
            "berth_capacity_tons": 85000,
            "current_vessel_imo": "9971472",
            "current_vessel_name": "SHINE JADE",
            "occupation_start": today.isoformat(),
            "estimated_departure": (today + timedelta(days=3)).isoformat(),
            "operation_type": "loading",
            "cargo_type": "MILHO",
            "loading_rate_tons_hour": 1100,
            "completion_percentage": 25,
            "status": "occupied",
            "equipment_available": {"cranes": 2, "conveyors": 3, "hoppers": 5},
            "source": "mock_data"
        }
    ]
    
    try:
        response = supabase.table('berth_occupancy').insert(berth_data).execute()
        print(f"✅ {len(berth_data)} ocupações de berços carregadas com sucesso!")
        return True
    except Exception as e:
        print(f"❌ Erro ao carregar ocupações de berços: {e}")
        return False

def get_vessels():
    """Busca todos os navios"""
    try:
        response = supabase.table('vessels').select('*').execute()
        return response.data
    except Exception as e:
        print(f"❌ Erro ao buscar navios: {e}")
        return []

def get_port_operations():
    """Busca operações portuárias"""
    try:
        response = supabase.table('port_operations').select('*').execute()
        return response.data
    except Exception as e:
        print(f"❌ Erro ao buscar operações portuárias: {e}")
        return []

def get_berth_status():
    """Busca status dos berços"""
    try:
        response = supabase.table('berth_occupancy').select('*').execute()
        return response.data
    except Exception as e:
        print(f"❌ Erro ao buscar status dos berços: {e}")
        return []

def get_line_up_schedule():
    """Busca programação de navios"""
    try:
        response = supabase.table('line_ups').select('*').order('eta').execute()
        return response.data
    except Exception as e:
        print(f"❌ Erro ao buscar programação: {e}")
        return []

def get_dashboard_data():
    """Busca dados consolidados para o dashboard"""
    try:
        vessels = get_vessels()
        operations = get_port_operations()
        berths = get_berth_status()
        schedule = get_line_up_schedule()
        
        # Calcula estatísticas
        total_vessels = len(vessels)
        total_tonnage = sum([op.get('quantity_tons', 0) for op in operations])
        occupied_berths = len([b for b in berths if b.get('status') == 'occupied'])
        
        return {
            'vessels': vessels,
            'operations': operations,
            'berths': berths,
            'schedule': schedule,
            'stats': {
                'total_vessels': total_vessels,
                'total_tonnage': total_tonnage,
                'occupied_berths': occupied_berths,
                'scheduled_vessels': len(schedule)
            }
        }
    except Exception as e:
        print(f"❌ Erro ao buscar dados do dashboard: {e}")
        return {}

if __name__ == "__main__":
    print("🚢 Configurando Supabase para Navios Graneleiros...")
    
    # Testa conexão
    if test_connection():
        print("\n📊 Carregando dados mock...")
        
        # Carrega dados
        load_sample_vessels()
        load_sample_port_operations()
        load_sample_line_ups()
        load_sample_berth_occupancy()
        
        print("\n✅ Configuração do Supabase concluída!")
        
        # Testa as consultas
        print("\n🔍 Testando consultas...")
        dashboard_data = get_dashboard_data()
        
        if dashboard_data:
            stats = dashboard_data.get('stats', {})
            print(f"📊 Total de navios: {stats.get('total_vessels', 0)}")
            print(f"🏭 Tonelagem total: {stats.get('total_tonnage', 0):,.0f} tons")
            print(f"⚓ Berços ocupados: {stats.get('occupied_berths', 0)}")
            print(f"📅 Navios programados: {stats.get('scheduled_vessels', 0)}")
        else:
            print("❌ Falha ao buscar dados do dashboard")
    else:
        print("❌ Falha na configuração do Supabase")

